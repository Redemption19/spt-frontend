// Test Environment Variables
console.log('🧪 Environment Variable Test');
console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
console.log('Expected Backend URL: http://localhost:8000');

// Test Backend Connection
async function testBackendConnection() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    console.log('🔗 Testing connection to:', backendUrl);
    
    const response = await fetch(`${backendUrl}/api/v1/chat/store`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        session_id: 'test_browser_' + Date.now(),
        user_message: 'Browser test message',
        bot_response: 'Browser test response',
        context_used: ['Test context'],
        response_time: 1.0,
        page_url: window.location.href
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Backend connection successful:', result);
    } else {
      console.error('❌ Backend connection failed:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('❌ Backend connection error:', error);
  }
}

// Run test
testBackendConnection(); 