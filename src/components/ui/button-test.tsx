import { Button } from "./button"

export function ButtonTest() {
  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-heading font-medium mb-6">Button Component Test</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Bold Contrast Variants</h3>
          <div className="flex gap-4 flex-wrap">
            <Button variant="primary" size="bold">
              Primary Button
            </Button>
            <Button variant="secondary" size="bold">
              Secondary Button
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Different Sizes</h3>
          <div className="flex gap-4 flex-wrap items-center">
            <Button variant="primary" size="sm">
              Small Primary
            </Button>
            <Button variant="primary" size="default">
              Default Primary
            </Button>
            <Button variant="primary" size="lg">
              Large Primary
            </Button>
            <Button variant="primary" size="bold">
              Bold Primary
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Secondary Variants</h3>
          <div className="flex gap-4 flex-wrap items-center">
            <Button variant="secondary" size="sm">
              Small Secondary
            </Button>
            <Button variant="secondary" size="default">
              Default Secondary
            </Button>
            <Button variant="secondary" size="lg">
              Large Secondary
            </Button>
            <Button variant="secondary" size="bold">
              Bold Secondary
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Legacy Variants (for compatibility)</h3>
          <div className="flex gap-4 flex-wrap">
            <Button variant="default">
              Default
            </Button>
            <Button variant="outline">
              Outline
            </Button>
            <Button variant="ghost">
              Ghost
            </Button>
            <Button variant="link">
              Link
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Disabled States</h3>
          <div className="flex gap-4 flex-wrap">
            <Button variant="primary" size="bold" disabled>
              Disabled Primary
            </Button>
            <Button variant="secondary" size="bold" disabled>
              Disabled Secondary
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}