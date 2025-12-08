"use client";

import { useState } from "react";
import { Info, Check, X, Bell, Settings, User, Mail, Search, ChevronRight, Home, Plus, Trash } from "lucide-react";

// FSD 규칙 준수: @shared에서 import
import {
  Button,
  IconButton,
  Input,
  PasswordInput,
  Textarea,
  Checkbox,
  Badge,
  Select,
  Dialog,
  Popover,
  Tooltip,
  cn,
  type Size,
} from "@shared";

const SIZES: Size[] = ["xs", "sm", "md", "lg", "xl"];

const Section = ({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section className={cn("space-y-4", className)}>
      <h2 className="border-b pb-2 text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
};

const SubSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      {children}
    </div>
  );
};

const ComponentsPage = () => {
  const [checkboxStates, setCheckboxStates] = useState<Record<string, boolean>>({
    default: false,
    checked: true,
  });
  const [selectValue, setSelectValue] = useState("");

  return (
    <Tooltip.Provider>
      <div className="min-h-screen bg-background p-8">
        <div className="mx-auto max-w-6xl space-y-12">
          {/* Header */}
          <header className="space-y-2">
            <h1 className="text-3xl font-bold">Component Showcase</h1>
            <p className="text-muted-foreground">
              공통 컴포넌트 라이브러리 - xs, sm, md, lg, xl 사이즈 시스템
            </p>
          </header>

          {/* Size Comparison */}
          <Section title="Size Comparison (Height Alignment)">
            <p className="mb-4 text-sm text-muted-foreground">
              동일한 사이즈의 컴포넌트들은 세로로 나열했을 때 높이가 일치합니다.
            </p>
            <div className="space-y-4">
              {SIZES.map((size) => (
                <div key={size} className="flex flex-wrap items-center gap-4">
                  <span className="w-8 font-mono text-sm text-muted-foreground">{size}</span>
                  <Button size={size}>Button</Button>
                  <IconButton size={size} variant="outline">
                    <Settings />
                  </IconButton>
                  <Input size={size} placeholder="Input" className="w-32" />
                  <PasswordInput size={size} placeholder="Password" className="w-32" />
                  <Select value="" onValueChange={() => {}} size={size}>
                    <Select.Trigger className="w-32">
                      <Select.Value placeholder="Select" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="1">Option 1</Select.Item>
                    </Select.Content>
                  </Select>
                  <Badge size={size}>Badge</Badge>
                </div>
              ))}
            </div>
          </Section>

          {/* Button */}
          <Section title="Button">
            <SubSection title="Variants">
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </SubSection>

            <SubSection title="Sizes">
              <div className="flex flex-wrap items-center gap-3">
                {SIZES.map((size) => (
                  <Button key={size} size={size}>
                    {size.toUpperCase()}
                  </Button>
                ))}
              </div>
            </SubSection>

            <SubSection title="With Icons">
              <div className="flex flex-wrap gap-3">
                <Button>
                  <Mail /> Send Email
                </Button>
                <Button variant="outline">
                  <Settings /> Settings
                </Button>
                <Button variant="secondary">
                  Next <ChevronRight />
                </Button>
              </div>
            </SubSection>

            <SubSection title="States">
              <div className="flex flex-wrap gap-3">
                <Button disabled>Disabled</Button>
                <Button variant="outline" disabled>
                  Disabled Outline
                </Button>
              </div>
            </SubSection>
          </Section>

          {/* Icon Button */}
          <Section title="Icon Button">
            <SubSection title="Variants">
              <div className="flex flex-wrap gap-3">
                <IconButton variant="default">
                  <Home />
                </IconButton>
                <IconButton variant="secondary">
                  <Bell />
                </IconButton>
                <IconButton variant="destructive">
                  <Trash />
                </IconButton>
                <IconButton variant="outline">
                  <Settings />
                </IconButton>
                <IconButton variant="ghost">
                  <User />
                </IconButton>
              </div>
            </SubSection>

            <SubSection title="Sizes">
              <div className="flex flex-wrap items-center gap-3">
                {SIZES.map((size) => (
                  <IconButton key={size} size={size} variant="outline">
                    <Plus />
                  </IconButton>
                ))}
              </div>
            </SubSection>
          </Section>

          {/* Input */}
          <Section title="Input & Password">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Standard Input</h3>
                <SubSection title="Sizes">
                  <div className="space-y-3">
                    {SIZES.map((size) => (
                      <Input
                        key={size}
                        size={size}
                        placeholder={`${size.toUpperCase()} size input`}
                      />
                    ))}
                  </div>
                </SubSection>
                <SubSection title="States">
                  <div className="space-y-3">
                    <Input placeholder="Default" />
                    <Input placeholder="Disabled" disabled />
                    <Input placeholder="Invalid" aria-invalid="true" />
                  </div>
                </SubSection>
                <SubSection title="With Icons">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input className="pl-10" placeholder="Search..." />
                  </div>
                </SubSection>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Password Input</h3>
                <SubSection title="Sizes">
                  <div className="space-y-3">
                    {SIZES.map((size) => (
                      <PasswordInput
                        key={size}
                        size={size}
                        placeholder={`${size.toUpperCase()} size password`}
                      />
                    ))}
                  </div>
                </SubSection>
                <SubSection title="States">
                  <div className="space-y-3">
                    <PasswordInput placeholder="Password" />
                    <PasswordInput placeholder="Disabled" disabled />
                    <PasswordInput placeholder="Invalid" aria-invalid="true" />
                  </div>
                </SubSection>
              </div>
            </div>
          </Section>

          {/* Textarea */}
          <Section title="Textarea">
            <SubSection title="Sizes">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {(["sm", "md", "lg"] as Size[]).map((size) => (
                  <Textarea
                    key={size}
                    size={size}
                    placeholder={`${size.toUpperCase()} size textarea`}
                  />
                ))}
              </div>
            </SubSection>

            <SubSection title="States">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Textarea placeholder="Default" />
                <Textarea placeholder="Disabled" disabled />
                <Textarea placeholder="Invalid" aria-invalid="true" />
              </div>
            </SubSection>
          </Section>

          {/* Select */}
          <Section title="Select (Compound Pattern)">
            <SubSection title="Sizes">
              <div className="flex flex-wrap gap-3">
                {SIZES.map((size) => (
                  <Select key={size} value={selectValue} onValueChange={setSelectValue} size={size}>
                    <Select.Trigger className="w-40">
                      <Select.Value placeholder={`${size.toUpperCase()}`} />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="option1">Option 1</Select.Item>
                      <Select.Item value="option2">Option 2</Select.Item>
                      <Select.Item value="option3">Option 3</Select.Item>
                    </Select.Content>
                  </Select>
                ))}
              </div>
            </SubSection>

            <SubSection title="States">
              <div className="flex flex-wrap gap-3">
                <Select>
                  <Select.Trigger className="w-40">
                    <Select.Value placeholder="Default" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="1">Option 1</Select.Item>
                  </Select.Content>
                </Select>
                <Select disabled>
                  <Select.Trigger className="w-40" disabled>
                    <Select.Value placeholder="Disabled" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="1">Option 1</Select.Item>
                  </Select.Content>
                </Select>
              </div>
            </SubSection>
          </Section>

          {/* Checkbox */}
          <Section title="Checkbox">
            <SubSection title="Sizes">
              <div className="flex flex-wrap items-center gap-6">
                {SIZES.map((size) => (
                  <label key={size} className="flex cursor-pointer items-center gap-2">
                    <Checkbox size={size} />
                    <span className="text-sm">{size.toUpperCase()}</span>
                  </label>
                ))}
              </div>
            </SubSection>

            <SubSection title="States">
              <div className="flex flex-wrap items-center gap-6">
                <label className="flex cursor-pointer items-center gap-2">
                  <Checkbox
                    checked={checkboxStates.default}
                    onCheckedChange={(checked) =>
                      setCheckboxStates((prev) => ({ ...prev, default: checked as boolean }))
                    }
                  />
                  <span className="text-sm">Unchecked</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <Checkbox
                    checked={checkboxStates.checked}
                    onCheckedChange={(checked) =>
                      setCheckboxStates((prev) => ({ ...prev, checked: checked as boolean }))
                    }
                  />
                  <span className="text-sm">Checked</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <Checkbox checked="indeterminate" />
                  <span className="text-sm">Indeterminate</span>
                </label>
                <label className="flex cursor-not-allowed items-center gap-2 opacity-50">
                  <Checkbox disabled />
                  <span className="text-sm">Disabled</span>
                </label>
              </div>
            </SubSection>
          </Section>

          {/* Badge */}
          <Section title="Badge">
            <SubSection title="Variants">
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="purple">Purple</Badge>
                <Badge variant="pink">Pink</Badge>
                <Badge variant="orange">Orange</Badge>
                <Badge variant="cyan">Cyan</Badge>
                <Badge variant="lime">Lime</Badge>
              </div>
            </SubSection>

            <SubSection title="Sizes">
              <div className="flex flex-wrap items-center gap-2">
                {SIZES.map((size) => (
                  <Badge key={size} size={size} variant="default">
                    {size.toUpperCase()}
                  </Badge>
                ))}
              </div>
            </SubSection>

            <SubSection title="Use Cases">
              <div className="flex flex-wrap gap-2">
                <Badge variant="success">
                  <Check className="h-3 w-3" /> Completed
                </Badge>
                <Badge variant="warning">
                  <Bell className="h-3 w-3" /> Pending
                </Badge>
                <Badge variant="destructive">
                  <X className="h-3 w-3" /> Failed
                </Badge>
                <Badge variant="info">
                  <Info className="h-3 w-3" /> Info
                </Badge>
              </div>
            </SubSection>
          </Section>

          {/* Dialog */}
          <Section title="Dialog (Compound Pattern)">
            <div className="flex flex-wrap gap-3">
              <Dialog>
                <Dialog.Trigger asChild>
                  <Button>Open Dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Dialog Title</Dialog.Title>
                    <Dialog.Description>
                      This is a dialog description. It provides additional context about the dialog
                      content.
                    </Dialog.Description>
                  </Dialog.Header>
                  <div className="py-4">
                    <p>Dialog content goes here. You can add any content you want.</p>
                  </div>
                  <Dialog.Footer>
                    <Button variant="outline">Cancel</Button>
                    <Button>Confirm</Button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog>

              <Dialog>
                <Dialog.Trigger asChild>
                  <Button variant="destructive">Delete Item</Button>
                </Dialog.Trigger>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Are you sure?</Dialog.Title>
                    <Dialog.Description>
                      This action cannot be undone. This will permanently delete the item.
                    </Dialog.Description>
                  </Dialog.Header>
                  <Dialog.Footer>
                    <Button variant="outline">Cancel</Button>
                    <Button variant="destructive">Delete</Button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog>
            </div>
          </Section>

          {/* Popover */}
          <Section title="Popover (Compound Pattern)">
            <div className="flex flex-wrap gap-3">
              <Popover>
                <Popover.Trigger asChild>
                  <Button variant="outline">Open Popover</Button>
                </Popover.Trigger>
                <Popover.Content>
                  <div className="space-y-2">
                    <h4 className="font-medium">Popover Title</h4>
                    <p className="text-sm text-muted-foreground">
                      This is a popover. It can contain any content.
                    </p>
                  </div>
                </Popover.Content>
              </Popover>

              <Popover>
                <Popover.Trigger asChild>
                  <Button variant="outline">
                    <User /> User Settings
                  </Button>
                </Popover.Trigger>
                <Popover.Content className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium">User Settings</h4>
                    <div className="space-y-2">
                      <Input placeholder="Display Name" />
                      <Input placeholder="Email" type="email" />
                    </div>
                    <Button className="w-full">Save Changes</Button>
                  </div>
                </Popover.Content>
              </Popover>
            </div>
          </Section>

          {/* Tooltip */}
          <Section title="Tooltip (Compound Pattern)">
            <div className="flex flex-wrap gap-3">
              <Tooltip>
                <Tooltip.Trigger asChild>
                  <Button variant="outline">Hover me</Button>
                </Tooltip.Trigger>
                <Tooltip.Content>
                  <p>This is a tooltip</p>
                </Tooltip.Content>
              </Tooltip>

              <Tooltip>
                <Tooltip.Trigger asChild>
                  <Button variant="outline">
                    <Info className="h-4 w-4" />
                  </Button>
                </Tooltip.Trigger>
                <Tooltip.Content>
                  <p>More information about this feature</p>
                </Tooltip.Content>
              </Tooltip>

              <Tooltip>
                <Tooltip.Trigger asChild>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </Tooltip.Trigger>
                <Tooltip.Content side="bottom">
                  <p>Settings</p>
                </Tooltip.Content>
              </Tooltip>
            </div>
          </Section>

          {/* Form Example */}
          <Section title="Form Example">
            <div className="max-w-md space-y-4 rounded-lg border p-6">
              <h3 className="font-semibold">Contact Form</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-medium">Password</label>
                  <PasswordInput placeholder="Create a password" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Select>
                    <Select.Trigger>
                      <Select.Value placeholder="Select a subject" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="general">General Inquiry</Select.Item>
                      <Select.Item value="support">Technical Support</Select.Item>
                      <Select.Item value="feedback">Feedback</Select.Item>
                    </Select.Content>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea placeholder="Enter your message" />
                </div>
                <label className="flex cursor-pointer items-center gap-2">
                  <Checkbox />
                  <span className="text-sm">I agree to the terms and conditions</span>
                </label>
                <Button className="w-full">Submit</Button>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </Tooltip.Provider>
  );
};

export default ComponentsPage;
