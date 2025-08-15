'use client';

import { useState, useEffect } from 'react';
import { loadAllKnowledge } from '@/lib/utils/knowledge-loader';
import { initKnowledgeBase, queryKnowledgeBase } from '@/lib/utils/knowledge-base';

export default function TestKnowledgePage() {
  const [existingKnowledge, setExistingKnowledge] = useState<any[]>([]);
  const [newKnowledge, setNewKnowledge] = useState<any[]>([]);
  const [combinedKnowledge, setCombinedKnowledge] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const testKnowledgeBases = async () => {
      setIsLoading(true);
      try {
        // Test 1: Load existing knowledge base
        const existingResponse = await fetch('/knowledge-base.merged.json');
        if (existingResponse.ok) {
          const existingData = await existingResponse.json();
          setExistingKnowledge(existingData);
          console.log('✅ Existing knowledge base loaded:', existingData.length, 'items');
        }

        // Test 2: Load new knowledge base
        const newData = await loadAllKnowledge();
        setNewKnowledge(newData);
        console.log('✅ New knowledge base loaded:', newData.length, 'items');

        // Test 3: Initialize combined knowledge base
        await initKnowledgeBase();
        
        // Test 4: Test search functionality
        const testSearch = await queryKnowledgeBase('pension schemes', 5);
        setSearchResults(testSearch);
        console.log('✅ Search test completed:', testSearch.length, 'results');

      } catch (error) {
        console.error('❌ Error testing knowledge bases:', error);
      } finally {
        setIsLoading(false);
      }
    };

    testKnowledgeBases();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const results = await queryKnowledgeBase(searchQuery, 5);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Knowledge Base Test Page</h1>
      
      {isLoading && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800">🔄 Loading and testing knowledge bases...</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Existing Knowledge Base */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-3">📚 Existing Knowledge Base</h2>
          <p className="text-sm text-gray-600 mb-2">
            Your original knowledge-base.merged.json file
          </p>
          <div className="bg-gray-50 p-3 rounded">
            <p><strong>Total Items:</strong> {existingKnowledge.length}</p>
            <p><strong>Status:</strong> {existingKnowledge.length > 0 ? '✅ Loaded' : '❌ Not loaded'}</p>
          </div>
          {existingKnowledge.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium mb-2">Sample Items:</p>
              <div className="space-y-2">
                {existingKnowledge.slice(0, 3).map((item, index) => (
                  <div key={index} className="text-xs bg-white p-2 rounded border">
                    <p><strong>ID:</strong> {item.id}</p>
                    <p><strong>Title:</strong> {item.title}</p>
                    <p><strong>Category:</strong> {item.category}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* New Knowledge Base */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-3">🆕 New Knowledge Base</h2>
          <p className="text-sm text-gray-600 mb-2">
            Additional knowledge from new-knowledge.md
          </p>
          <div className="bg-gray-50 p-3 rounded">
            <p><strong>Total Items:</strong> {newKnowledge.length}</p>
            <p><strong>Status:</strong> {newKnowledge.length > 0 ? '✅ Loaded' : '❌ Not loaded'}</p>
          </div>
          {newKnowledge.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium mb-2">Sample Items:</p>
              <div className="space-y-2">
                {newKnowledge.slice(0, 3).map((item, index) => (
                  <div key={index} className="text-xs bg-white p-2 rounded border">
                    <p><strong>ID:</strong> {item.id}</p>
                    <p><strong>Title:</strong> {item.title}</p>
                    <p><strong>Category:</strong> {item.category}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Combined Knowledge Base */}
      <div className="border rounded-lg p-4 mb-8">
        <h2 className="text-xl font-semibold mb-3">🔗 Combined Knowledge Base</h2>
        <p className="text-sm text-gray-600 mb-2">
          Total items available for search and chatbot
        </p>
        <div className="bg-green-50 p-3 rounded">
          <p><strong>Total Combined Items:</strong> {existingKnowledge.length + newKnowledge.length}</p>
          <p><strong>Status:</strong> {searchResults.length > 0 ? '✅ Working' : '❌ Not working'}</p>
        </div>
      </div>

      {/* Search Test */}
      <div className="border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-3">🔍 Search Test</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter search query (e.g., 'pension schemes', 'tax benefits')"
            className="flex-1 px-3 py-2 border rounded-lg"
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Search
          </button>
        </div>

        {searchResults.length > 0 && (
          <div>
            <p className="text-sm text-gray-600 mb-2">
              Found {searchResults.length} results for "{searchQuery}"
            </p>
            <div className="space-y-3">
              {searchResults.map((item, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded border">
                  <p><strong>ID:</strong> {item.id}</p>
                  <p><strong>Title:</strong> {item.title}</p>
                  <p><strong>Category:</strong> {item.category}</p>
                  <p><strong>Content Preview:</strong> {item.content.substring(0, 100)}...</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">📋 What This Test Shows:</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Whether your existing knowledge base is loading correctly</li>
          <li>• Whether the new knowledge base is loading correctly</li>
          <li>• Whether both are combined and searchable</li>
          <li>• Whether the chatbot can access all knowledge</li>
        </ul>
      </div>
    </div>
  );
}
