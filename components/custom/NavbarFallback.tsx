export function NavbarFallback() {
  return (
    <nav className="w-full py-5 flex items-center justify-between pointer-events-none">
      {/* LEFT SIDE: Logo & Navigation Links */}
      <div className="flex items-center gap-8">
        {/* Logo Placeholder (matches text-3xl) */}
        <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />

        {/* Navigation Links Placeholder */}
        <div className="flex items-center gap-2">
          {/* 3 items simulating Home, Blogs, Create */}
          <div className="h-10 w-16 animate-pulse rounded-md bg-muted" />
          <div className="h-10 w-16 animate-pulse rounded-md bg-muted" />
          <div className="h-10 w-16 animate-pulse rounded-md bg-muted" />
        </div>
      </div>

      {/* RIGHT SIDE: Auth Buttons & Theme Toggle */}
      <div className="flex items-center gap-2">
        {/* Auth Buttons Placeholders (matches Sign up / Sign in) */}
        <div className="h-10 w-20 animate-pulse rounded-md bg-muted" />
        <div className="h-10 w-20 animate-pulse rounded-md bg-muted" />

        {/* Theme Toggle Placeholder (Square) */}
        <div className="h-10 w-10 animate-pulse rounded-md bg-muted" />
      </div>
    </nav>
  );
}
