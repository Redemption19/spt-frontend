"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FileText, BookOpen, BarChart, Search, Download, ExternalLink, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useDownloads, useDownloadCategories, useDownloadFile } from '@/hooks/useApi';
import { toast } from '@/hooks/use-toast';

// Helper function to get appropriate icon for file type
const getFileIcon = (fileType: string) => {
  switch (fileType?.toLowerCase()) {
    case 'pdf':
      return <FileText className="h-6 w-6 text-red-500" />;
    case 'doc':
    case 'docx':
      return <FileText className="h-6 w-6 text-blue-500" />;
    case 'xls':
    case 'xlsx':
      return <BarChart className="h-6 w-6 text-green-500" />;
    case 'ppt':
    case 'pptx':
      return <FileText className="h-6 w-6 text-orange-500" />;
    default:
      return <FileText className="h-6 w-6 text-primary" />;
  }
};

// Helper function to format file size
const formatFileSize = (sizeInKB: number) => {
  if (sizeInKB < 1024) {
    return `${sizeInKB} KB`;
  } else if (sizeInKB < 1024 * 1024) {
    return `${(sizeInKB / 1024).toFixed(1)} MB`;
  } else {
    return `${(sizeInKB / (1024 * 1024)).toFixed(1)} GB`;
  }
};

// Helper function to format category display name
const formatCategoryName = (category: string) => {
  const categoryMap: { [key: string]: string } = {
    'forms': 'Forms & Applications',
    'guides': 'Guides & Manuals',
    'reports': 'Reports & Documents',
    'brochures': 'Brochures & Flyers',
    'newsletters': 'Newsletters',
    'presentations': 'Presentations',
    'policies': 'Policies & Procedures',
    'annual-reports': 'Annual Reports',
  };
  return categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1);
};

export default function DownloadCentrePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [downloadingIds, setDownloadingIds] = useState<Set<number>>(new Set());

  // API hooks
  const { data: downloadsData, isLoading: downloadsLoading, error: downloadsError } = useDownloads({
    category: selectedCategory || undefined,
    search: searchTerm || undefined,
    page: currentPage,
  });

  const { data: categoriesData, isLoading: categoriesLoading } = useDownloadCategories();
  const downloadFileMutation = useDownloadFile();

  const handleDownload = async (downloadId: number, title: string, event: React.MouseEvent) => {
    // Prevent event bubbling and multiple triggers
    event.preventDefault();
    event.stopPropagation();
    
    // Prevent multiple downloads of the same file
    if (downloadingIds.has(downloadId)) {
      return;
    }

    setDownloadingIds(prev => new Set(prev).add(downloadId));

    try {
      const result = await downloadFileMutation.mutateAsync(downloadId);
      
      if (result.data?.download_url) {
        // Create a temporary link for download
        const link = document.createElement('a');
        link.href = result.data.download_url;
        link.download = result.data.filename || 'download';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "Download Started",
          description: `${title} is now downloading.`,
        });
      } else {
        throw new Error('Download URL not available');
      }
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed", 
        description: "Unable to download the file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDownloadingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(downloadId);
        return newSet;
      });
    }
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    setCurrentPage(1); // Reset to first page when changing category
  };

  // Loading state
  if (downloadsLoading && !downloadsData) {
    return (
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">Download Centre</h1>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
                Welcome to the Standard Pensions Trust Download Centre. Here, you can access and download essential documents related to our services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (downloadsError) {
    return (
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Downloads Unavailable</h1>
            <p className="text-muted-foreground">Unable to load downloads. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  const downloads = downloadsData?.data || [];
  const categories = categoriesData?.data || [];

  // Group downloads by category for display
  const downloadsByCategory = downloads.reduce((acc: { [key: string]: any[] }, download) => {
    const category = download.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(download);
    return acc;
  }, {});

  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="mb-10 sm:mb-12 md:mb-16 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">Download Centre</h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
              Welcome to the Standard Pensions Trust Download Centre. Here, you can access and download essential documents related to our services.
            </p>
          </section>

          {/* Search & Filter Section */}
          <section className="mb-10 sm:mb-12 md:mb-16 p-8 bg-card rounded-lg">
            <div className="text-center mb-6">
              <Search className="h-12 w-12 text-primary mb-4 mx-auto" />
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 text-foreground">Search & Filter Documents</h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-6">
                Use the search bar below to quickly find the specific documents you need.
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="w-full max-w-md mx-auto mb-6">
              <div className="flex items-center space-x-2">
                <input 
                  type="text" 
                  placeholder="Search documents..." 
                  className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch}>Search</Button>
              </div>
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant={selectedCategory === '' ? 'default' : 'outline'}
                  onClick={() => handleCategoryFilter('')}
                  className="mb-2"
                >
                  All Categories
                </Button>
                {categories.map((category: any) => (
                  <Button
                    key={category.category}
                    variant={selectedCategory === category.category ? 'default' : 'outline'}
                    onClick={() => handleCategoryFilter(category.category)}
                    className="mb-2"
                  >
                    {formatCategoryName(category.category)} ({category.count})
                  </Button>
                ))}
              </div>
            )}
          </section>

          {/* Downloads Sections */}
          {downloads.length === 0 ? (
            <div className="text-center py-12">
              <FileDown className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No downloads found matching your criteria.</p>
            </div>
          ) : selectedCategory ? (
            // Single category view
            <section className="mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-6 text-foreground">
                {formatCategoryName(selectedCategory)}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {downloads.map((download) => (
                  <Card key={download.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center gap-3">
                      {getFileIcon(download.file_type)}
                      <div className="flex-1">
                        <CardTitle className="text-base leading-tight">{download.title}</CardTitle>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <span>{download.file_type?.toUpperCase()}</span>
                          <span>•</span>
                          <span>{formatFileSize(download.file_size)}</span>
                          <span>•</span>
                          <span>{download.download_count} downloads</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {download.description && (
                        <p className="text-muted-foreground text-sm mb-4">{download.description}</p>
                      )}
                      <Button 
                        onClick={(e) => handleDownload(download.id, download.title, e)}
                        className="w-full"
                        disabled={downloadingIds.has(download.id)}
                      >
                        <FileDown className="h-4 w-4 mr-2" />
                        {downloadingIds.has(download.id) ? 'Downloading...' : 'Download'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ) : (
            // All categories view
            Object.entries(downloadsByCategory).map(([category, categoryDownloads]) => (
              <section key={category} className="mb-10 sm:mb-12 md:mb-16">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-6 text-foreground">
                  {formatCategoryName(category)}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryDownloads.map((download) => (
                    <Card key={download.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="flex flex-row items-center gap-3">
                        {getFileIcon(download.file_type)}
                        <div className="flex-1">
                          <CardTitle className="text-base leading-tight">{download.title}</CardTitle>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <span>{download.file_type?.toUpperCase()}</span>
                            <span>•</span>
                            <span>{download.download_count} downloads</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {download.description && (
                          <p className="text-muted-foreground text-sm mb-4">{download.description}</p>
                        )}
                        <Button 
                          onClick={(e) => handleDownload(download.id, download.title, e)}
                          className="w-full"
                          disabled={downloadingIds.has(download.id)}
                        >
                          <FileDown className="h-4 w-4 mr-2" />
                          {downloadingIds.has(download.id) ? 'Downloading...' : 'Download'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm mt-6">
                  {category === 'forms' && 'Ensure all forms are properly completed and signed before submission.'}
                  {category === 'brochures' && 'These brochures provide detailed information about the features, benefits, and requirements of each scheme.'}
                  {category === 'reports' && 'Each report includes financial statements, investment performance, and other relevant information.'}
                  {category === 'guides' && 'Step-by-step guides to help you navigate our services and processes.'}
                  {category === 'newsletters' && 'Stay informed with our latest news and updates.'}
                </p>
              </section>
            ))
          )}

          {/* Pagination */}
          {downloadsData && downloadsData.last_page > 1 && (
            <section className="flex justify-center gap-2 mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                Previous
              </Button>
              <span className="flex items-center px-4">
                Page {currentPage} of {downloadsData.last_page}
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage >= downloadsData.last_page}
              >
                Next
              </Button>
            </section>
          )}
        </div>
      </div>
    </section>
  );
} 