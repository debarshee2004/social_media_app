// Imports
import { Outlet, Navigate } from "react-router-dom";

/**
 * The `AuthLayout` component is responsible for rendering the layout for authentication-related pages.
 * It checks the authentication status to determine whether to redirect to the home page or display the
 * authentication layout with an optional side image.
 *
 * @component
 */
const AuthLayout = () => {
  // Authentication status (dummy value, replace with actual authentication logic)
  const isAuthenticated = false;

  /**
   * Renders the authentication layout with the main content area and an optional side image.
   *
   * @returns {JSX.Element} - Returns JSX representing the authentication layout.
   */
  return (
    <>
      {isAuthenticated ? (
        // Redirect to the home page if authenticated
        <Navigate to="/" />
      ) : (
        // Display the authentication layout with main content and side image
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            {/* Outlet for rendering child components (pages) */}
            <Outlet />
          </section>

          {/* Side image (visible only on larger screens) */}
          <img
            src="/public/assets/images/side-img.svg"
            alt="Side-Image"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          />
        </>
      )}
    </>
  );
};

export default AuthLayout;

