import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";

// Considerar que la session sin modificarla a mano
// solamente tendríamos {
//   "name": "Admin",
//   "email": "admin@google.com",
//   "image": null
// }

// Si queremos agregar mas información a la session
// podemos hacerlo en el callback jwt de auth.config.ts y session
export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    // redirect("/auth/login?returnTo=/shop/profile");
    redirect("/");
  }

  return (
    <div>
      <Title title="Perfil" />
      <pre>{JSON.stringify(session.user, null, 2)}</pre>
      {/* Para el tipado estricto, ver el archivo nextauth.d.ts en el root */}
      <h3 className="text-3xl mb-10">{session.user.role}</h3>
    </div>
  );
}
