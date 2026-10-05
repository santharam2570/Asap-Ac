import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" aria-hidden />
      <Container className="relative text-center">
        <p className="font-display text-8xl font-black text-brand-600">404</p>
        <h1 className="mt-4 text-3xl font-extrabold">Page not found</h1>
        <p className="mx-auto mt-3 max-w-md text-ink-500">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink href="/">Go home</ButtonLink>
          <ButtonLink href="/courses" variant="outline">
            Browse courses
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
