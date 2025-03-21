
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { CalendarIcon, BuildingIcon, UserIcon } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.isAdmin) {
      navigate("/admin");
    }
  }, [user, navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="flex flex-col gap-16 py-8">
      <section className="flex flex-col items-center text-center px-4 py-10 md:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto space-y-6"
        >
          <motion.div variants={itemVariants} className="space-y-2">
            <span className="inline-block bg-primary/10 text-primary text-sm px-3 py-1 rounded-full font-medium">
              May 10-13, 2022
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Online Job Fair Registration
            </h1>
          </motion.div>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with leading companies and secure your next career opportunity at our exclusive online job fair.
            Book up to 3 interviews with your preferred companies.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 pt-4">
            {user ? (
              <Button size="lg" asChild>
                <Link to="/bookings">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  Book Interviews
                </Link>
              </Button>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link to="/register">
                    <UserIcon className="w-5 h-5 mr-2" />
                    Register Now
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/login">
                    Sign In
                  </Link>
                </Button>
              </>
            )}
          </motion.div>
        </motion.div>
      </section>

      <section className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-card rounded-lg border shadow-sm p-6 hover-lift"
          >
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <UserIcon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy Registration</h3>
            <p className="text-muted-foreground">
              Create an account in minutes with just your name, email, and phone number to get started.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-card rounded-lg border shadow-sm p-6 hover-lift"
          >
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <BuildingIcon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Top Companies</h3>
            <p className="text-muted-foreground">
              Connect with leading companies from various industries looking for talented professionals like you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-card rounded-lg border shadow-sm p-6 hover-lift"
          >
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CalendarIcon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Flexible Scheduling</h3>
            <p className="text-muted-foreground">
              Book up to three interview sessions with your preferred companies during the job fair days.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow these simple steps to participate in our online job fair
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Register",
                description: "Create your account with basic information",
              },
              {
                step: "02",
                title: "Browse Companies",
                description: "Explore the participating companies and their profiles",
              },
              {
                step: "03",
                title: "Book Interviews",
                description: "Select up to 3 companies and schedule your interviews",
              },
              {
                step: "04",
                title: "Attend",
                description: "Join your scheduled interviews during the job fair days",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">Ready to find your next opportunity?</h2>
              <p className="text-muted-foreground">
                Don't miss this chance to connect with leading companies and advance your career. 
                Register today to secure your spot at our exclusive online job fair.
              </p>
              <div className="flex flex-wrap gap-4">
                {user ? (
                  <Button size="lg" asChild>
                    <Link to="/bookings">
                      <CalendarIcon className="w-5 h-5 mr-2" />
                      Book Your Interviews
                    </Link>
                  </Button>
                ) : (
                  <Button size="lg" asChild>
                    <Link to="/register">Get Started</Link>
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 bg-muted rounded-xl p-6 md:p-8 shadow-sm"
          >
            <div className="space-y-4">
              <h3 className="font-semibold text-xl">Event Details</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Dates</div>
                    <div className="text-muted-foreground">May 10th - 13th, 2022</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">Platform</div>
                    <div className="text-muted-foreground">Online (Virtual meetings)</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="m12 13-2-2 2-2" />
                      <path d="m14 17 3.75-3.75a1.44 1.44 0 0 0 0-2.5L14 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">Registration Limit</div>
                    <div className="text-muted-foreground">Up to 3 interview sessions per user</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
