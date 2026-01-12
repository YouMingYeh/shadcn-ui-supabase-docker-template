import Link from "next/link";
import { login, signInWithGoogle } from "./actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { SubmitButton } from "@/components/submit-button";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-12">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-none sm:border sm:shadow-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold tracking-tight text-center">
              登入
            </CardTitle>
            <CardDescription className="text-base text-center">
              輸入您的電子郵件和密碼以登入帳戶
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base">
                  電子郵件
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="h-11 text-base"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-base">
                    密碼
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                  >
                    忘記密碼？
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="h-11 text-base"
                />
              </div>
              <SubmitButton
                formAction={login}
                type="submit"
                className="w-full h-11 text-base"
              >
                登入
              </SubmitButton>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-3 text-muted-foreground">
                  或使用以下方式登入
                </span>
              </div>
            </div>

            <form>
              <SubmitButton
                formAction={signInWithGoogle}
                variant="outline"
                type="submit"
                className="w-full h-11 text-base"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                使用 Google 登入
              </SubmitButton>
            </form>

            <div className="mt-2 text-center text-base">
              還沒有帳戶？{" "}
              <Link
                href="/signup"
                className="text-primary hover:underline underline-offset-4"
              >
                建立帳戶
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
