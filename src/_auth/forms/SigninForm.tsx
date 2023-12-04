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
import { useSignInAccount } from "@/lib/react-quary/quriesAndMutations";
//
import { SigninValidation } from "@/lib/validation";
//
import { useUserContext } from "@/context/AuthContext";

/**
 * The `SigninForm` component handles user authentication by providing a form for signing in.
 * It utilizes various external libraries, custom hooks, and components for form validation,
 * state management, and UI rendering.
 *
 * @component
 */
const SigninForm = () => {
  // Custom hooks and external libraries
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const { mutateAsync: signInAccount } = useSignInAccount();

  // Form initialization using react-hook-form
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /**
   * Handles form submission by calling the `signInAccount` mutation with user-entered values.
   * Displays a toast message on sign-in failure and navigates to the home page on successful sign-in.
   *
   * @param {Object} values - The user-entered values from the form.
   * @returns {void | Promise<void>} - Returns nothing on successful sign-in, or displays a toast message on failure.
   */
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({ title: "Sign in failed. Please try again." });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({ title: "Sign in failed. Please try again." });
    }
  }

  /**
   * Renders the sign-in form with input fields, buttons, and links.
   *
   * @returns {JSX.Element} - Returns JSX representing the sign-in form.
   */
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        {/* Logo and heading */}
        <img src="/assets/images/logo.svg" alt="logo" />
        <h3 className="h4-bold md:h3-bold pt-5 sm:pt-12">
          Log-in to your account.
        </h3>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back.
        </p>

        {/* Form for user input */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
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

          {/* Sign In button */}
          <Button className="shad-button_primary" type="submit">
            {isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>

          {/* Signup link */}
          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account?
            <Link to="/sign-up" className="text-primary-500">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;

