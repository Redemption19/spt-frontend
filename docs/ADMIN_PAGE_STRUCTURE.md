# SPT Frontend Admin Management System

## Overview
This document outlines the complete admin page structure needed to manage all frontend content for Standard Pensions Trust. The admin system will allow content managers to update, create, and manage all public-facing content without requiring technical knowledge.

## 🏠 **1. Hero Section Management**

### **Admin Route**: `/admin/hero-sections`

#### **Content Structure**:
- **Hero Slider Management**
  - Add/Edit/Delete slider slides
  - Slide content: Title, Subtitle, Background Image, CTA Button Text & Link
  - Slide order management
  - Active/Inactive status
  - Image upload and optimization

#### **Data Fields**:
```typescript
interface HeroSlide {
  id: number
  title: string
  subtitle: string
  background_image: string
  cta_text: string
  cta_link: string
  is_active: boolean
  order: number
  created_at: string
  updated_at: string
}
```

#### **Admin Features**:
- Drag & drop slide reordering
- Image upload with preview
- Rich text editor for titles/subtitles
- CTA button customization
- Bulk operations (activate/deactivate multiple slides)

---

## 🏢 **2. About Us Section Management**

### **Admin Route**: `/admin/about`

#### **2.1 Company Overview** (`/admin/about/overview`)
- **Mission & Vision Statements**
- **Company History**
- **Core Values**
- **Company Statistics** (Members, Employers, Assets, etc.)

#### **2.2 Leadership Team** (`/admin/about/leadership`)
- **Board Members Management**
  - Add/Edit/Delete board members
  - Profile information: Name, Position, Bio, Photo
  - Social media links
  - Display order

#### **2.3 Company Timeline** (`/admin/about/timeline`)
- **Historical Events Management**
  - Add/Edit/Delete timeline events
  - Event details: Year, Title, Description, Date, Type, Color
  - Event categorization (incorporation, merger, milestone)

#### **2.4 Careers** (`/admin/about/careers`)
- **Job Postings Management**
  - Add/Edit/Delete job positions
  - Job details: Title, Department, Location, Employment Type, Experience Level
  - Job descriptions and requirements
  - Application status tracking
  - Career statistics and filters

---

## 🛠️ **3. Services Section Management**

### **Admin Route**: `/admin/services`

#### **3.1 Self-Service Center** (`/admin/services/self-service`)
- **Form Management**
  - Upload/Update downloadable forms
  - Form categorization (Enrollment, Claims, Updates)
  - Form metadata (Title, Description, File size, Last updated)
  - Form access permissions

#### **3.2 Survey & Feedback** (`/admin/services/surveys`)
- **Survey Management**
  - Create/Edit/Delete surveys
  - Survey types: General, Portal, Customer Service, Suggestions
  - Question management and types
  - Response collection and analytics
  - Survey results dashboard

#### **3.3 FAQs** (`/admin/services/faqs`)
- **FAQ Management**
  - Add/Edit/Delete FAQ entries
  - Category organization (Psychological, Contribution, Investment, Learning, Services, General)
  - Search functionality
  - FAQ analytics (most viewed, helpful ratings)

#### **3.4 Enrollment Services** (`/admin/services/enrollments`)
- **Enrollment Process Management**
  - Enrollment form customization
  - Process workflow management
  - Status tracking system
  - Document verification workflow

---

## 📰 **4. Media Section Management**

### **Admin Route**: `/admin/media`

#### **4.1 Blog Management** (`/admin/media/blog`)
- **Blog Posts**
  - Create/Edit/Delete blog posts
  - Rich text editor with image support
  - SEO optimization (Meta title, description, keywords)
  - Category and tag management
  - Featured image management
  - Draft/Published status
  - Author management
  - Comment moderation

#### **4.2 Events Management** (`/admin/media/events`)
- **Event Management**
  - Create/Edit/Delete events
  - Event details: Title, Description, Date, Time, Venue, Agenda
  - Speaker management
  - Registration form customization
  - Event capacity and registration tracking
  - Event categories and filtering
  - Calendar integration

#### **4.3 Downloads Management** (`/admin/media/downloads`)
- **Resource Management**
  - Upload/Update downloadable resources
  - Resource types: Forms, Brochures, Financial Statements, Guides
  - File categorization and organization
  - Download tracking and analytics
  - Version control for documents

#### **4.4 Gallery Management** (`/admin/media/gallery`)
- **Image Management**
  - Upload/Edit/Delete gallery images
  - Image categorization (Events, Facilities, Team, etc.)
  - Image optimization and resizing
  - Alt text and description management
  - Gallery organization and ordering
  - Bulk image operations

---

## 📞 **5. Contact Section Management**

### **Admin Route**: `/admin/contact`

#### **5.1 Contact Information**
- **Office Locations Management**
  - Add/Edit/Delete branch offices
  - Contact details: Address, Phone, Email, Hours
  - Map coordinates for Google Maps integration
  - Office status (Active/Inactive)

#### **5.2 Contact Form Management**
- **Form Configuration**
  - Customize contact form fields
  - Form submission handling
  - Auto-response email templates
  - Contact form analytics

#### **5.3 Inquiry Management**
- **Inquiry Tracking**
  - View and respond to contact form submissions
  - Inquiry categorization and routing
  - Response templates
  - Inquiry status tracking

---

## 📧 **6. Newsletter Management**

### **Admin Route**: `/admin/newsletter`

#### **6.1 Newsletter Management**
- **Subscriber Management**
  - View all newsletter subscribers
  - Subscriber analytics and demographics
  - Subscription status management
  - Bulk subscriber operations

#### **6.2 Newsletter Campaigns**
- **Campaign Creation**
  - Create and send newsletter campaigns
  - Email template management
  - Campaign scheduling
  - Campaign performance analytics
  - A/B testing capabilities

---

## 🎨 **7. Content Management System**

### **Admin Route**: `/admin/content`

#### **7.1 Page Content Management**
- **Dynamic Content Blocks**
  - Manage content for all static pages
  - Rich text editor with media support
  - Content versioning
  - Content approval workflow

#### **7.2 Navigation Management**
- **Menu Structure**
  - Customize main navigation menu
  - Dropdown menu management
  - Menu item ordering
  - Menu item permissions

#### **7.3 Footer Management**
- **Footer Content**
  - Manage footer links and content
  - Social media links
  - Copyright information
  - Footer organization

---

## 📊 **8. Analytics & Reporting**

### **Admin Route**: `/admin/analytics`

#### **8.1 Content Analytics**
- **Page Performance**
  - Page view analytics
  - User engagement metrics
  - Popular content tracking
  - Search analytics

#### **8.2 User Behavior**
- **User Journey Tracking**
  - User flow analysis
  - Conversion tracking
  - User interaction patterns
  - Mobile vs desktop usage

#### **8.3 Form Analytics**
- **Form Performance**
  - Form completion rates
  - Form abandonment analysis
  - Field-level analytics
  - Form optimization insights

---

## ⚙️ **9. System Configuration**

### **Admin Route**: `/admin/settings`

#### **9.1 Site Configuration**
- **General Settings**
  - Site title and description
  - Logo management
  - Theme customization
  - SEO settings

#### **9.2 User Management**
- **Admin Users**
  - Create/Edit/Delete admin users
  - Role-based permissions
  - Access control
  - Activity logging

#### **9.3 Backup & Maintenance**
- **System Maintenance**
  - Content backup
  - System health monitoring
  - Performance optimization
  - Security settings

---

## 🔐 **10. Security & Permissions**

### **Role-Based Access Control**:
- **Super Admin**: Full access to all features
- **Content Manager**: Manage all content (Blog, Events, FAQs, etc.)
- **Media Manager**: Manage media content (Images, Downloads, Gallery)
- **Support Manager**: Manage contact forms, surveys, FAQs
- **Analytics Viewer**: View analytics and reports only

---

## 📱 **11. Mobile Responsiveness**

### **Admin Interface Features**:
- **Responsive Design**: Works on all device sizes
- **Touch-Friendly**: Optimized for tablet and mobile use
- **Offline Capability**: Basic content editing without internet
- **Mobile Notifications**: Push notifications for important updates

---

## 🚀 **12. Implementation Priority**

### **Phase 1 (Core Content Management)**:
1. Hero Section Management
2. Blog Management
3. Basic Page Content Management
4. User Authentication & Permissions

### **Phase 2 (Advanced Features)**:
1. Events Management
2. Gallery Management
3. Survey & Feedback System
4. Analytics Dashboard

### **Phase 3 (Optimization)**:
1. Advanced Analytics
2. Workflow Automation
3. Content Versioning
4. Performance Optimization

---

## 💻 **13. Technical Requirements**

### **Frontend Framework**:
- Next.js 14+ with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Shadcn UI components

### **State Management**:
- React Query for server state
- Zustand for client state
- React Hook Form for forms

### **File Management**:
- Image optimization and resizing
- File upload with progress tracking
- Cloud storage integration
- CDN support for media files

### **Database Integration**:
- RESTful API endpoints
- Real-time updates
- Data validation and sanitization
- Backup and recovery systems

---

## 📋 **14. Content Workflow**

### **Content Creation Process**:
1. **Draft Creation**: Content manager creates draft content
2. **Review Process**: Content reviewed by supervisor
3. **Approval**: Content approved for publication
4. **Scheduling**: Content scheduled for publication
5. **Publication**: Content goes live on frontend
6. **Monitoring**: Track performance and engagement

### **Content Update Process**:
1. **Change Request**: Identify content that needs updates
2. **Draft Creation**: Create updated version
3. **Review & Approval**: Review and approve changes
4. **Publication**: Update live content
5. **Archive**: Maintain content history

---

## 🎯 **15. Success Metrics**

### **Content Management Efficiency**:
- Time to publish new content
- Content update frequency
- User engagement with content
- Content performance metrics

### **User Experience**:
- Admin interface usability
- Content management workflow efficiency
- Error reduction in content updates
- Training time for new content managers

---

This comprehensive admin system will provide SPT with full control over their frontend content while maintaining a professional, user-friendly interface for content managers.
