import requests
import sys
import json
from datetime import datetime

class StepbauAPITester:
    def __init__(self, base_url="https://bau-partner-de.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            else:
                print(f"❌ Unsupported method: {method}")
                return False, {}

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"Response: {json.dumps(response_data, indent=2)}")
                except:
                    print(f"Response: {response.text}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response.text}")

            self.results.append({
                "test": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response": response.text[:500] if response.text else ""
            })

            return success, response.json() if success and response.text else {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout after 10 seconds")
            self.results.append({
                "test": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": "TIMEOUT",
                "success": False,
                "response": "Request timeout"
            })
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.results.append({
                "test": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": "ERROR",
                "success": False,
                "response": str(e)
            })
            return False, {}

    def test_api_root(self):
        """Test API root endpoint"""
        success, response = self.run_test(
            "API Root",
            "GET",
            "/",
            200
        )
        return success

    def test_contact_submission(self):
        """Test contact form submission"""
        test_data = {
            "name": "Test User",
            "firma": "Test Company",
            "telefon": "+49176123456789",
            "email": "test@example.com",
            "nachricht": "Dies ist eine Testnachricht für die Kontaktform.",
            "datenschutz": True
        }
        
        success, response = self.run_test(
            "Contact Form Submission",
            "POST",
            "/contact",
            200,
            data=test_data
        )
        
        if success and response:
            # Validate response structure
            required_fields = ['id', 'name', 'telefon', 'email', 'nachricht', 'datenschutz', 'created_at']
            missing_fields = [field for field in required_fields if field not in response]
            if missing_fields:
                print(f"⚠️  Warning: Missing fields in response: {missing_fields}")
                return False
            else:
                print("✅ Response structure validated")
                return True
        
        return success

    def test_contact_submission_missing_required(self):
        """Test contact submission with missing required fields"""
        test_data = {
            "name": "Test User",
            # Missing telefon, email, nachricht
            "datenschutz": True
        }
        
        success, response = self.run_test(
            "Contact Form - Missing Required Fields",
            "POST",
            "/contact",
            422,  # Validation error expected
            data=test_data
        )
        return success

    def test_contact_submission_invalid_email(self):
        """Test contact submission with invalid email"""
        test_data = {
            "name": "Test User",
            "telefon": "+49176123456789",
            "email": "invalid-email",
            "nachricht": "Test message",
            "datenschutz": True
        }
        
        success, response = self.run_test(
            "Contact Form - Invalid Email",
            "POST",
            "/contact",
            422,  # Validation error expected
            data=test_data
        )
        return success

    def test_get_contacts(self):
        """Test getting contact submissions"""
        success, response = self.run_test(
            "Get Contact Submissions",
            "GET",
            "/contact",
            200
        )
        
        if success and isinstance(response, list):
            print(f"✅ Retrieved {len(response)} contact submissions")
            return True
        elif success:
            print(f"⚠️  Warning: Expected list response, got: {type(response)}")
            return False
        
        return success

def main():
    print("🚀 Starting STEPBAU API Tests")
    print("=" * 50)
    
    # Setup
    tester = StepbauAPITester()

    # Run all tests
    print("\n📡 Testing API endpoints...")
    
    # Test API root
    tester.test_api_root()
    
    # Test contact form functionality
    tester.test_contact_submission()
    tester.test_contact_submission_missing_required()
    tester.test_contact_submission_invalid_email()
    
    # Test contact retrieval
    tester.test_get_contacts()

    # Print final results
    print(f"\n📊 Test Results Summary")
    print("=" * 30)
    print(f"Tests run: {tester.tests_run}")
    print(f"Tests passed: {tester.tests_passed}")
    print(f"Tests failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success rate: {(tester.tests_passed/tester.tests_run*100):.1f}%")
    
    # Print detailed results
    print(f"\n📝 Detailed Results:")
    for result in tester.results:
        status = "✅ PASS" if result["success"] else "❌ FAIL"
        print(f"{status} | {result['test']} | {result['method']} {result['endpoint']} | {result['actual_status']}")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())