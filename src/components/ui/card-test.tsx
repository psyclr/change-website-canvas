import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./card"
import { Button } from "./button"

export function CardTest() {
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-heading font-medium mb-6">Card Component Test</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Bold Variant Card */}
        <Card variant="bold">
          <CardHeader variant="bold">
            <CardTitle variant="bold">Bold Card Title</CardTitle>
            <CardDescription variant="bold">
              This is a Bold Contrast design system card with proper 12px radius, shadow, and hover animations.
            </CardDescription>
          </CardHeader>
          <CardContent variant="bold">
            <p className="text-body-mobile md:text-body-desktop">
              Card content goes here with proper typography scaling and spacing.
            </p>
          </CardContent>
          <CardFooter variant="bold">
            <Button variant="primary" size="bold">
              Action Button
            </Button>
          </CardFooter>
        </Card>

        {/* Interactive Bold Card */}
        <Card variant="interactive">
          <CardHeader variant="bold">
            <CardTitle variant="bold">Interactive Card</CardTitle>
            <CardDescription variant="bold">
              This card has cursor pointer and hover effects for clickable cards.
            </CardDescription>
          </CardHeader>
          <CardContent variant="bold">
            <div className="space-y-2">
              <div className="text-small text-fg/60">Feature 1</div>
              <div className="text-small text-fg/60">Feature 2</div>
              <div className="text-small text-fg/60">Feature 3</div>
            </div>
          </CardContent>
        </Card>

        {/* Default Card for comparison */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Default Card</CardTitle>
            <CardDescription>
              This is the legacy shadcn card for comparison.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Standard card content with default styling.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">
              Default Button
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Responsive Test */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Responsive Card Test</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="bold">
            <CardHeader variant="bold">
              <CardTitle variant="bold">Responsive Typography</CardTitle>
              <CardDescription variant="bold">
                This card demonstrates responsive typography that scales from mobile to desktop sizes.
              </CardDescription>
            </CardHeader>
            <CardContent variant="bold">
              <div className="space-y-4">
                <p className="text-body-mobile md:text-body-desktop">
                  Body text that scales responsively.
                </p>
                <div className="text-small">
                  Small text for additional information.
                </div>
              </div>
            </CardContent>
            <CardFooter variant="bold" className="gap-3">
              <Button variant="primary" size="bold">
                Primary
              </Button>
              <Button variant="secondary" size="bold">
                Secondary
              </Button>
            </CardFooter>
          </Card>

          <Card variant="bold">
            <CardHeader variant="bold">
              <CardTitle variant="bold">Package Card Example</CardTitle>
              <CardDescription variant="bold">
                Example of how cards might be used for package/pricing display.
              </CardDescription>
            </CardHeader>
            <CardContent variant="bold">
              <div className="space-y-4">
                <div className="text-h2-mobile md:text-h2-desktop font-heading font-medium text-accent">
                  от 2,500 PLN
                </div>
                <ul className="space-y-2 text-body-mobile md:text-body-desktop">
                  <li>• Feature one</li>
                  <li>• Feature two</li>
                  <li>• Feature three</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter variant="bold">
              <Button variant="primary" size="bold" className="w-full">
                Выбрать
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}