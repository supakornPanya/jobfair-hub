
import { motion } from "framer-motion";

const Privacy = () => {
  return (
    <div className="max-w-3xl mx-auto py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground mt-2">Last updated: May 1, 2022</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">1. Information We Collect</h2>
            <p className="text-muted-foreground">
              We collect personal information that you provide to us, including name, email address, telephone number, and password.
              We also collect information about your interview bookings and interactions with our platform.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
            <p className="text-muted-foreground">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Provide, maintain, and improve our platform</li>
              <li>Process and manage your interview bookings</li>
              <li>Communicate with you about your account and bookings</li>
              <li>Share your booking information with participating companies</li>
              <li>Improve and personalize your experience</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">3. Information Sharing</h2>
            <p className="text-muted-foreground">
              We share your personal information with:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Companies you book interviews with</li>
              <li>Service providers who assist in operating our platform</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">4. Data Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate security measures to protect your personal information.
              However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">5. Your Rights</h2>
            <p className="text-muted-foreground">
              You have the right to access, correct, or delete your personal information.
              You can update your information through your account settings or contact us for assistance.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">6. Changes to Privacy Policy</h2>
            <p className="text-muted-foreground">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">7. Contact Information</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at privacy@jobfairhub.example.com.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Privacy;
