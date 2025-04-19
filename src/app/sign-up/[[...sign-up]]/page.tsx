import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <SignUp path='/sign-in' routing='path' fallbackRedirectUrl={"/"} />;
}
