import { Input } from "./input"
import { Textarea } from "./textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { Label } from "./label"
import { Button } from "./button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./card"

export function FormTest() {
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-heading font-medium mb-6">Form Components Test</h2>
      
      {/* Bold Contrast Form */}
      <Card variant="bold">
        <CardHeader variant="bold">
          <CardTitle variant="bold">Bold Contrast Form</CardTitle>
        </CardHeader>
        <CardContent variant="bold">
          <form className="space-y-6">
            {/* Input Field */}
            <div className="space-y-2">
              <Label variant="bold" htmlFor="name">
                Full Name
              </Label>
              <Input 
                variant="bold" 
                id="name" 
                placeholder="Enter your full name" 
              />
            </div>

            {/* Input with Error */}
            <div className="space-y-2">
              <Label variant="bold" htmlFor="email">
                Email Address
              </Label>
              <Input 
                variant="bold" 
                id="email" 
                type="email"
                placeholder="Enter your email" 
                error={true}
              />
              <p className="text-sm text-red-600">Please enter a valid email address</p>
            </div>

            {/* Phone Input */}
            <div className="space-y-2">
              <Label variant="bold" htmlFor="phone">
                Phone Number
              </Label>
              <Input 
                variant="bold" 
                id="phone" 
                type="tel"
                placeholder="+48 123 456 789" 
              />
            </div>

            {/* Select Field */}
            <div className="space-y-2">
              <Label variant="bold">
                Service Type
              </Label>
              <Select>
                <SelectTrigger variant="bold">
                  <SelectValue placeholder="Choose a service" />
                </SelectTrigger>
                <SelectContent variant="bold">
                  <SelectItem value="start">Start Package</SelectItem>
                  <SelectItem value="clarity">Clarity Package</SelectItem>
                  <SelectItem value="growth">Growth Package</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Select with Error */}
            <div className="space-y-2">
              <Label variant="bold">
                Budget Range
              </Label>
              <Select>
                <SelectTrigger variant="bold" error={true}>
                  <SelectValue placeholder="Select your budget" />
                </SelectTrigger>
                <SelectContent variant="bold">
                  <SelectItem value="2500">2,500 - 5,000 PLN</SelectItem>
                  <SelectItem value="5000">5,000 - 10,000 PLN</SelectItem>
                  <SelectItem value="10000">10,000+ PLN</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-red-600">Please select a budget range</p>
            </div>

            {/* Textarea */}
            <div className="space-y-2">
              <Label variant="bold" htmlFor="message">
                Project Description
              </Label>
              <Textarea 
                variant="bold" 
                id="message" 
                placeholder="Tell us about your project requirements..." 
              />
            </div>

            {/* Textarea with Error */}
            <div className="space-y-2">
              <Label variant="bold" htmlFor="requirements">
                Additional Requirements
              </Label>
              <Textarea 
                variant="bold" 
                id="requirements" 
                placeholder="Any specific requirements or preferences..." 
                error={true}
              />
              <p className="text-sm text-red-600">This field is required</p>
            </div>
          </form>
        </CardContent>
        <CardFooter variant="bold" className="gap-3">
          <Button variant="primary" size="bold">
            Submit Form
          </Button>
          <Button variant="secondary" size="bold">
            Save Draft
          </Button>
        </CardFooter>
      </Card>

      {/* Legacy Form for Comparison */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>Legacy Form (Default)</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="legacy-name">Name</Label>
              <Input id="legacy-name" placeholder="Enter name" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="legacy-email">Email</Label>
              <Input id="legacy-email" type="email" placeholder="Enter email" />
            </div>
            
            <div className="space-y-2">
              <Label>Service</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">Web Design</SelectItem>
                  <SelectItem value="app">App Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="legacy-message">Message</Label>
              <Textarea id="legacy-message" placeholder="Your message" />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button variant="default">Submit</Button>
        </CardFooter>
      </Card>

      {/* Form States Demo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="bold">
          <CardHeader variant="bold">
            <CardTitle variant="bold">Normal States</CardTitle>
          </CardHeader>
          <CardContent variant="bold" className="space-y-4">
            <Input variant="bold" placeholder="Normal input" />
            <Textarea variant="bold" placeholder="Normal textarea" />
            <Select>
              <SelectTrigger variant="bold">
                <SelectValue placeholder="Normal select" />
              </SelectTrigger>
              <SelectContent variant="bold">
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card variant="bold">
          <CardHeader variant="bold">
            <CardTitle variant="bold">Error States</CardTitle>
          </CardHeader>
          <CardContent variant="bold" className="space-y-4">
            <div>
              <Input variant="bold" placeholder="Error input" error={true} />
              <p className="text-sm text-red-600 mt-1">Error message</p>
            </div>
            <div>
              <Textarea variant="bold" placeholder="Error textarea" error={true} />
              <p className="text-sm text-red-600 mt-1">Error message</p>
            </div>
            <div>
              <Select>
                <SelectTrigger variant="bold" error={true}>
                  <SelectValue placeholder="Error select" />
                </SelectTrigger>
                <SelectContent variant="bold">
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-red-600 mt-1">Error message</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Disabled States */}
      <Card variant="bold">
        <CardHeader variant="bold">
          <CardTitle variant="bold">Disabled States</CardTitle>
        </CardHeader>
        <CardContent variant="bold" className="space-y-4">
          <Input variant="bold" placeholder="Disabled input" disabled />
          <Textarea variant="bold" placeholder="Disabled textarea" disabled />
          <Select disabled>
            <SelectTrigger variant="bold">
              <SelectValue placeholder="Disabled select" />
            </SelectTrigger>
            <SelectContent variant="bold">
              <SelectItem value="option1">Option 1</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  )
}