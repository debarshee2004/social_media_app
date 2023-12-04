// Imports
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
//
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/shared/Loader";
//
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-quary/quriesAndMutations";
//
import { SignupValidation } from "@/lib/validation";
//
import { useUserContext } from "@/context/AuthContext";

/**
 * The `SignupForm` component handles user registration by providing a form for creating a new account.
 * It utilizes various external libraries, custom hooks, and components for form validation,
 * state management, and UI rendering.
 *
 * @component
 */
const SignupForm = () => {
  // Custom hooks and external libraries
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount();

  // Form initialization using react-hook-form
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  /**
   * Handles form submission by calling the `createUserAccount` and `signInAccount` mutations
   * with user-entered values. Displays toast messages on sign-up and sign-in failures,
   * and navigates to the home page on successful sign-in.
   *
   * @async
   * @function
   * @param {Object} values - The user-entered values from the form.
   * @returns {void | Promise<void>} - Returns nothing on successful sign-in, or displays toast messages on failure.
   */
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    // Submission of the form to create a new user account
    const newUser = await createUserAccount(values);

    if (!newUser) {
      return toast({
        title: "Sign Up failed. Please try again.",
      });
    }

    // Sign in the newly created user
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({ title: "Sign in failed. Please try again." });
    }

    // Check if the user is authenticated after signing in
    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({ title: "Sign in failed. Please try again." });
    }
  }

  // Rendering
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        {/* Logo and heading */}
        <img src="/assets/images/logo.svg" alt="logo" />
        <h3 className="h4-bold md:h3-bold pt-5 sm:pt-12">
          Create a new account.
        </h3>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use Snapgram please enter details.
        </p>

        {/* Form for user input */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          {/* Name input field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Username input field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email input field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password input field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Sign Up button */}
          <Button className="shad-button_primary" type="submit">
            {isCreatingAccount ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>

          {/* Login link */}
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link to="/sign-in" className="text-primary-500">
              Login
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
