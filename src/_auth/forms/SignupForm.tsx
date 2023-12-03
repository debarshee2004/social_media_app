import * as z from "zod";

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
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SignupValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link } from "react-router-dom";
import { createUserAccount } from "@/lib/appwrite/api";//check this line of code if the webpage is not loading

const SignupForm = () => {
  const isLoading = false;

  const { toast } = useToast();

  // 1. Define your form.
  /* The code `const form = useForm<z.infer<typeof SignupValidation>>({...})` is initializing a form
  using the `useForm` hook from the `react-hook-form` library. */
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // const { mutateAsync: createUserAccount, isLoading: isCreatingAccount } = useCreateUserAccountMutation(),

  // 2. Define a submit handler.
  /**
   * The function onSubmit is an asynchronous function that submits a form by creating a new user
   * account and logging the new user object to the console.
   * @param values - The `values` parameter is the data submitted from the form. It is inferred from
   * the `SignupValidation` schema, which defines the structure and validation rules for the form data.
   */
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    //Submission of the form
    const newUser = await createUserAccount(values);//check this line of code if the webpage is not loading

    if(!newUser){
      return toast({
        title: "Sign Up failed. Please try again.", 
      });
    }

    // const session = await signInAccount()

    // console.log(newUser);//check this line of code if the webpage is not loading
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h3 className="h4-bold md:h3-bold pt-5 sm:pt-12">
          Create a new account.
        </h3>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use Snapgram please enter detals.
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
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
          <Button className="shad-button_primary" type="submit">
            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader/> Loading...
              </div>
            ): "Sign Up"}
          </Button>
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
