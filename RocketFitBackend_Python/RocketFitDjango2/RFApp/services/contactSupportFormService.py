import requests

class ContactSupportFormService():

    def sendEmail(self, email, subject, description):
        support_function_url = "https://iugyswfbelozgsctcjsqf5d2dy0ihary.lambda-url.us-east-1.on.aws/"

        data = {
            "email": email,
            "subject": subject,
            "description": description
        }

        response = requests.post(support_function_url, json=data)

        if response.status_code == 200:
            return "Support request sent successfully."
        else:
            return f"Failed to send support request. Server responded with: {response.status_code}."
        