
import { motion } from "framer-motion";

const Terms = () => {
  return (
    <div className="max-w-3xl mx-auto py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <p className="text-muted-foreground mt-2">Last updated: May 1, 2022</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">1. Introduction</h2>
            <p className="text-muted-foreground">
              These Terms of Service govern your use of the JobFair Hub platform operated by JobFair Hub Inc.
              By accessing or using our service, you agree to be bound by these Terms.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">2. User Accounts</h2>
            <p className="text-muted-foreground">
              When you create an account with us, you must provide accurate, complete, and up-to-date information.
              You are responsible for maintaining the confidentiality of your account and password.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">3. Interview Bookings</h2>
            <p className="text-muted-foreground">
              Users are limited to booking a maximum of 3 interview sessions during the job fair.
              Bookings can only be made for the specified dates (May 10-13, 2022).
              Users may edit or cancel their bookings before the scheduled interview time.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">4. User Conduct</h2>
            <p className="text-muted-foreground">
              Users agree to conduct themselves professionally when using our platform and during interviews.
              Any form of harassment, discrimination, or inappropriate behavior will not be tolerated.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">5. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. We will provide notice of significant changes.
              Your continued use of the platform after changes constitutes acceptance of the updated terms.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">6. Contact Information</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms, please contact us at support@jobfairhub.example.com.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Terms;
