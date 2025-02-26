import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyP } from "@/components/ui/typography";
import { Session } from "@/lib/better-auth/auth-types";
import { format } from "date-fns";

async function UserInfoCard({ session }: { session: Session }) {
  const {
    user: { createdAt, email, id, emailVerified, name, twoFactorEnabled },
  } = session;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="card-title">User Info</CardTitle>
      </CardHeader>
      <CardContent>
        <TypographyP>User id: {id}</TypographyP>
        <TypographyP>Name: {name}</TypographyP>
        <TypographyP>Email: {email}</TypographyP>
        <TypographyP>
          Is email verified: {emailVerified ? "verified" : "unverified"}
        </TypographyP>
        <TypographyP>
          Is 2FA Enabled: {twoFactorEnabled ? "Enabled" : "Disabled"}
        </TypographyP>
        <TypographyP>Joined at: {format(createdAt, "dd-MMM-yyyy")}</TypographyP>
      </CardContent>
    </Card>
  );
}

export default UserInfoCard;