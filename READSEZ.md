1. Wir müssen unsere Routen anlegen um dafür zu sorgen dass unsere start-screen als aller erstes angezeigt wird.

In app-routing-modules finden wir, "const routes: Routes = [];"
Und dort registrieren wir einfach unsere component so: { path: '', component: StartScreenComponent },

2. Zudem ist es wichtig in "app.component.html" unsere Fähigkeit diese Routes zu erlesen einzugeben mit: "<router-outlet></router-outlet>"

3. 