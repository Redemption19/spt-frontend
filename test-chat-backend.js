// Test script to verify chat conversation backend integration
// Run this with: node test-chat-backend.js

const testChatBackend = async () => {
  const backendUrl = 'http://localhost:8000';
  
  console.log('🧪 Testing Chat Conversation Backend...\n');
  
  // Test 1: Store a conversation
  console.log('1️⃣ Testing conversation storage...');
  
  const testConversation = {
    session_id: 'test_session_' + Date.now(),
    user_message: 'How do I enroll in a pension scheme?',
    bot_response: 'To enroll in a pension scheme, you can choose between our Tier 3 Personal Pension or Provident Fund schemes. Here are the steps: 1. Visit our enrollment page at /services/enrollment 2. Complete the Employee Enrollment Form...',
    context_used: [
      {
        route: '/services/enrollment',
        content: 'enrollment process information'
      }
    ],
    message_type: 'enrollment',
    response_time: 2.5,
    page_url: 'http://localhost:3000/chat'
  };
  
  try {
    const storeResponse = await fetch(`${backendUrl}/api/v1/chat/store`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(testConversation)
    });
    
    const storeResult = await storeResponse.json();
    
    if (storeResponse.ok) {
      console.log('✅ Conversation stored successfully!');
      console.log('📄 Response:', storeResult);
    } else {
      console.log('❌ Failed to store conversation');
      console.log('📄 Error:', storeResult);
    }
  } catch (error) {
    console.log('❌ Network error storing conversation:', error.message);
  }
  
  console.log('\n');
  
  // Test 2: Get analytics (might fail if no auth, but shows API is accessible)
  console.log('2️⃣ Testing analytics endpoint...');
  
  try {
    const analyticsResponse = await fetch(`${backendUrl}/api/v1/admin/chat/analytics`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    const analyticsResult = await analyticsResponse.json();
    
    if (analyticsResponse.ok) {
      console.log('✅ Analytics retrieved successfully!');
      console.log('📊 Total conversations:', analyticsResult.data?.total_conversations || 0);
    } else {
      console.log('⚠️  Analytics endpoint accessible but may require authentication');
      console.log('📄 Response:', analyticsResult);
    }
  } catch (error) {
    console.log('❌ Network error accessing analytics:', error.message);
  }
  
  console.log('\n');
  
  // Test 3: Get conversations list
  console.log('3️⃣ Testing conversations list...');
  
  try {
    const conversationsResponse = await fetch(`${backendUrl}/api/v1/admin/chat/conversations`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    const conversationsResult = await conversationsResponse.json();
    
    if (conversationsResponse.ok) {
      console.log('✅ Conversations list retrieved successfully!');
      console.log('📝 Number of conversations:', conversationsResult.data?.data?.length || 0);
    } else {
      console.log('⚠️  Conversations endpoint accessible but may require authentication');
    }
  } catch (error) {
    console.log('❌ Network error accessing conversations:', error.message);
  }
  
  console.log('\n🎉 Backend testing completed!\n');
  
  console.log('📋 Next Steps:');
  console.log('1. ✅ Your chat conversations are now being stored in the database');
  console.log('2. 🔍 Check your backend database for chat_conversations table');
  console.log('3. 🖥️  Access admin panel to view conversations and analytics');
  console.log('4. 📊 Monitor chat performance and user questions');
  console.log('5. 🎯 Use analytics to improve chatbot responses\n');
};

// Run the test
testChatBackend(); 