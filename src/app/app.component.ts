import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    template: `
    <header class="topbar">
      <div class="brand" routerLink="/">RT Smart Notes</div>
      <nav class="nav">
        <a routerLink="/">Dashboard</a>
      </nav>
    </header>

    <main class="container">
      <router-outlet />
    </main>
    `,
    styles: [`
        .topbar { display:flex; justify-content:space-between; align-items:center; padding:12px 16px; border-bottom:1px solid #e5e5e5; }
    .brand { font-weight:700; cursor:pointer; }
    .nav a { margin-left:12px; text-decoration:none; }
    .container { padding:16px; max-width: 980px; margin: 0 auto; }
        `]
})
export class AppComponent{}