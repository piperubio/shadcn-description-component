import { Code2, Palette, Layout, FileText, Zap } from "lucide-react";
import {
  Description,
  DescriptionItem,
  DescriptionSection,
} from "@/components/description/description";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">Description Component</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A unified, flexible component for displaying structured information
            with two distinct variants: basic layout and bordered table format.
            Now with consistent API and enhanced capabilities.
          </p>
          <div className="flex items-center justify-center gap-2 pt-4">
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Responsive</Badge>
            <Badge variant="secondary">Unified API</Badge>
            <Badge variant="secondary">1-3 Columns</Badge>
          </div>
        </div>

        {/* Quick Overview */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Layout className="w-5 h-5 text-blue-500" />
                <CardTitle>Basic Variant</CardTitle>
              </div>
              <CardDescription>
                Clean, minimal layout for displaying key-value pairs without
                borders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Responsive grid layout (1-3 columns)</li>
                <li>• Perfect for user profiles and simple data</li>
                <li>• Minimal visual weight</li>
                <li>• Support for span across columns</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-green-500" />
                <CardTitle>Bordered Variant</CardTitle>
              </div>
              <CardDescription>
                Structured table format with borders for complex data
                presentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Table-like structure with clear divisions</li>
                <li>• Support for nested sections</li>
                <li>• Full column spanning (1-3 columns)</li>
                <li>• Ideal for detailed configurations</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Basic Variant Documentation */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Layout className="w-6 h-6 text-blue-500" />
            <h2 className="text-3xl font-bold">Basic Variant</h2>
          </div>

          {/* Basic Example */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Basic Usage (3 Columns)
              </CardTitle>
              <CardDescription>
                Simple user information display with 3-column support
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Description title="User Profile" columns={3} variant="basic">
                <DescriptionItem label="Name" value="John Doe" />
                <DescriptionItem label="Email" value="john@example.com" />
                <DescriptionItem
                  label="Role"
                  value={<Badge>Administrator</Badge>}
                />
                <DescriptionItem
                  label="Status"
                  span={2}
                  value={
                    <span className="text-green-600 bg-green-50 px-2 py-1 rounded">
                      Active (spans 2 columns)
                    </span>
                  }
                />
                <DescriptionItem
                  label="Bio"
                  value={
                    <span className="bg-blue-50 px-2 py-1 rounded">
                      Full-stack developer with 5+ years of experience (spans 3
                      columns)
                    </span>
                  }
                  span={3}
                />
                <DescriptionItem
                  label="Department"
                  value="Engineering"
                  span={1}
                />
                <DescriptionItem
                  label="Location"
                  value={
                    <span className="bg-yellow-50 px-2 py-1 rounded">
                      San Francisco, CA (spans 2 columns)
                    </span>
                  }
                  span={2}
                />
              </Description>

              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="w-4 h-4" />
                  <span className="font-medium">Code</span>
                </div>
                <pre className="text-sm overflow-x-auto">
                  {`<Description title="User Profile" columns={3} variant="basic">
  <DescriptionItem label="Name" value="John Doe" />
  <DescriptionItem label="Email" value="john@example.com" />
  <DescriptionItem label="Role" value={<Badge>Administrator</Badge>} />
  <DescriptionItem 
    label="Status" 
    span={2}
    value={<span className="text-green-600">Active (spans 2 columns)</span>} 
  />
  <DescriptionItem 
    label="Bio" 
    value="Full-stack developer with 5+ years of experience (spans 3 columns)"
    span={3}
  />
  <DescriptionItem label="Department" value="Engineering" />
  <DescriptionItem 
    label="Location" 
    value="San Francisco, CA (spans 2 columns)"
    span={2}
  />
</Description>`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* 2 Column Example */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                2-Column Layout Test
              </CardTitle>
              <CardDescription>
                Testing the columns={2} behavior to verify grid layout
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Description
                title="Contact Information"
                columns={2}
                variant="basic"
              >
                <DescriptionItem label="Name" value="Jane Smith" />
                <DescriptionItem label="Email" value="jane@company.com" />
                <DescriptionItem label="Phone" value="+1 (555) 123-4567" />
                <DescriptionItem
                  label="Address"
                  value={
                    <span className="bg-purple-50 px-2 py-1 rounded">
                      123 Main St, Anytown, USA (spans 2 columns)
                    </span>
                  }
                  span={2}
                />
                <DescriptionItem
                  label="Bio"
                  value={
                    <span className="bg-red-50 px-2 py-1 rounded">
                      Marketing professional with extensive experience in
                      digital campaigns (span=3 but should be limited to 2)
                    </span>
                  }
                  span={3}
                />
                <DescriptionItem label="Department" value="Marketing" />
                <DescriptionItem label="Position" value="Manager" />
              </Description>

              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="w-4 h-4" />
                  <span className="font-medium">Code</span>
                </div>
                <pre className="text-sm overflow-x-auto">
                  {`<Description title="Contact Information" columns={2} variant="basic">
  <DescriptionItem label="Name" value="Jane Smith" />
  <DescriptionItem label="Email" value="jane@company.com" />
  <DescriptionItem label="Phone" value="+1 (555) 123-4567" />
  <DescriptionItem 
    label="Address" 
    value="123 Main St, Anytown, USA (spans 2 columns)"
    span={2}
  />
  <DescriptionItem 
    label="Bio" 
    value="Marketing professional (span=3 but limited to 2)"
    span={3}
  />
  <DescriptionItem label="Department" value="Marketing" />
  <DescriptionItem label="Position" value="Manager" />
</Description>`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Bordered Variant Documentation */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Palette className="w-6 h-6 text-green-500" />
            <h2 className="text-3xl font-bold">Bordered Variant</h2>
          </div>

          {/* Bordered Example */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Advanced Usage
              </CardTitle>
              <CardDescription>
                Complex service configuration with 3-column support and sections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Description
                title="Service Details"
                columns={3}
                variant="bordered"
              >
                <DescriptionItem label="Service" value="Cloud Database" />
                <DescriptionItem
                  label="Plan"
                  value={<Badge variant="outline">Professional</Badge>}
                />
                <DescriptionItem
                  label="Status"
                  value={
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Active</span>
                    </div>
                  }
                />
                <DescriptionItem label="Region" value="US East (Virginia)" />
                <DescriptionItem
                  label="Created"
                  value="2024-01-15 10:30:00"
                  span={2}
                />
                {/* <DescriptionItem label="Monthly Cost" value="$99.00" /> */}

                {/* Full-width Technical Specs section using span={3} */}
                <DescriptionItem
                  label="Technical Specifications"
                  span={3}
                  value={
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <div className="font-medium">Database</div>
                        <div className="text-muted-foreground">
                          PostgreSQL 14
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">Storage</div>
                        <div className="text-muted-foreground">100 GB SSD</div>
                      </div>
                      <div>
                        <div className="font-medium">Memory</div>
                        <div className="text-muted-foreground">8 GB RAM</div>
                      </div>
                      <div>
                        <div className="font-medium">Connections</div>
                        <div className="text-muted-foreground">200 max</div>
                      </div>
                      <div>
                        <div className="font-medium">Backups</div>
                        <div className="text-muted-foreground">
                          Daily automated
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">Replication</div>
                        <div className="text-muted-foreground">3x factor</div>
                      </div>
                    </div>
                  }
                />

                {/* Using DescriptionSection for grouped content */}
                <DescriptionSection
                  label="Configuration Details"
                  className="col-span-full"
                >
                  <div className="space-y-1">
                    <div>Data disk type: MongoDB</div>
                    <div>Database version: 3.4</div>
                    <div>Package: dds.mongo.mid</div>
                    <div>Storage space: 10 GB</div>
                    <div>Region: East China 1</div>
                  </div>
                </DescriptionSection>
              </Description>

              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="w-4 h-4" />
                  <span className="font-medium">Code</span>
                </div>
                <pre className="text-sm overflow-x-auto">
                  {`<Description title="Service Details" columns={3} variant="bordered">
  <DescriptionItem label="Service" value="Cloud Database" />
  <DescriptionItem label="Plan" value={<Badge variant="outline">Professional</Badge>} />
  <DescriptionItem label="Status" value={<StatusIndicator />} />
  
  {/* Full-width section spanning all 3 columns */}
  <DescriptionItem 
    label="Technical Specifications" 
    span={3}
    value={<TechnicalSpecsGrid />} 
  />

  {/* Using DescriptionSection for grouped content */}
  <DescriptionSection label="Configuration Details">
    <div className="space-y-1">
      <div>Data disk type: MongoDB</div>
      <div>Database version: 3.4</div>
      {/* ... more config */}
    </div>
  </DescriptionSection>
</Description>`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* API Reference */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Unified API Reference</h2>

          <Card>
            <CardHeader>
              <CardTitle>Component Props</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Description Props</h4>
                  <div className="grid gap-2 text-sm">
                    <div className="grid grid-cols-4 gap-4 py-2 border-b font-medium">
                      <span>Prop</span>
                      <span>Type</span>
                      <span>Default</span>
                      <span>Description</span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 py-2">
                      <code>variant</code>
                      <span className="text-muted-foreground">
                        "basic" | "bordered"
                      </span>
                      <span className="text-muted-foreground">"basic"</span>
                      <span>Visual style variant</span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 py-2">
                      <code>columns</code>
                      <span className="text-muted-foreground">1 | 2 | 3</span>
                      <span className="text-muted-foreground">3</span>
                      <span>Number of responsive columns</span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 py-2">
                      <code>title</code>
                      <span className="text-muted-foreground">string?</span>
                      <span className="text-muted-foreground">-</span>
                      <span>Optional section title</span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 py-2">
                      <code>className</code>
                      <span className="text-muted-foreground">string?</span>
                      <span className="text-muted-foreground">-</span>
                      <span>Additional CSS classes</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">DescriptionItem Props</h4>
                  <div className="grid gap-2 text-sm">
                    <div className="grid grid-cols-4 gap-4 py-2 border-b font-medium">
                      <span>Prop</span>
                      <span>Type</span>
                      <span>Default</span>
                      <span>Description</span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 py-2">
                      <code>label</code>
                      <span className="text-muted-foreground">string</span>
                      <span className="text-muted-foreground">-</span>
                      <span>Field label</span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 py-2">
                      <code>value</code>
                      <span className="text-muted-foreground">ReactNode</span>
                      <span className="text-muted-foreground">-</span>
                      <span>Field value (can be JSX)</span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 py-2">
                      <code>span</code>
                      <span className="text-muted-foreground">1 | 2 | 3</span>
                      <span className="text-muted-foreground">1</span>
                      <span>Column span for the item</span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 py-2">
                      <code>className</code>
                      <span className="text-muted-foreground">string?</span>
                      <span className="text-muted-foreground">-</span>
                      <span>Additional CSS classes</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">
                    DescriptionSection Props
                  </h4>
                  <div className="grid gap-2 text-sm">
                    <div className="grid grid-cols-4 gap-4 py-2 border-b font-medium">
                      <span>Prop</span>
                      <span>Type</span>
                      <span>Default</span>
                      <span>Description</span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 py-2">
                      <code>label</code>
                      <span className="text-muted-foreground">string</span>
                      <span className="text-muted-foreground">-</span>
                      <span>Section label</span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 py-2">
                      <code>children</code>
                      <span className="text-muted-foreground">ReactNode</span>
                      <span className="text-muted-foreground">-</span>
                      <span>Section content</span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 py-2">
                      <code>className</code>
                      <span className="text-muted-foreground">string?</span>
                      <span className="text-muted-foreground">-</span>
                      <span>Additional CSS classes</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Best Practices */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Best Practices</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">✓ Do</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Use basic variant for simple, scannable information</p>
                <p>• Use bordered variant for complex, structured data</p>
                <p>
                  • Leverage ReactNode values for rich content (badges, icons,
                  etc.)
                </p>
                <p>• Use span prop to create full-width sections when needed</p>
                <p>
                  • Choose appropriate column counts (1-3) for your content
                  density
                </p>
                <p>
                  • Use DescriptionSection for grouped content in bordered
                  variant
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">✗ Don't</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Mix variants within the same logical section</p>
                <p>• Use too many columns on mobile devices</p>
                <p>
                  • Overcomplicate simple key-value pairs with bordered variant
                </p>
                <p>• Forget to handle long text content gracefully</p>
                <p>• Use bordered variant for just 2-3 simple fields</p>
                <p>• Exceed span values beyond the column count</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
