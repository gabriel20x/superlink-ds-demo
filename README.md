# Storybook Superlink Component Library

A modern React component library built with Storybook, TypeScript, and Vite. This library provides a collection of reusable UI components that can be easily integrated into any React project.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd storybook-superlink
```

2. Install dependencies:
```bash
yarn install
```

3. Start Storybook:
```bash
yarn storybook
```

This will start the Storybook development server at `http://localhost:6006` where you can view and interact with all components.

## 📁 Project Structure

```
storybook-superlink/
├── src/
│   ├── components/     # React components
│   ├── docs/          # MDX documentation files
│   ├── stories/       # Component stories
│   └── index.ts       # Component exports
├── .storybook/        # Storybook configuration
└── public/            # Static assets
```

## 🛠️ Development

### Component Structure

Each component should follow this structure:
```
src/
├── components/
│   └── ComponentName/
│       ├── ComponentName.tsx
│       ├── ComponentName.module.css
│       ├── ComponentName.test.tsx
└── stories/
    └── ComponentName.stories.tsx
```

### Styling Approach

- Use CSS Modules for component-specific styles
- Implement variants using Class Variance Authority (CVA)
- Example of a component with variants:
```typescript
import { cva } from 'class-variance-authority';
import styles from './Button.module.css';

const buttonVariants = cva(styles.base, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
    },
    size: {
      small: styles.small,
      medium: styles.medium,
      large: styles.large,
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
});

export const Button = ({ variant, size, ...props }) => {
  return (
    <button className={buttonVariants({ variant, size })} {...props} />
  );
};
```

### Behavior Handling

- Keep components focused on presentation
- Handle all behaviors in parent components
- Example of behavior implementation:

```typescript
// Stepper with navigation
const StepperWithActions = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      <Stepper>
        <StepperItems 
          label="Step 1" 
          state={currentStep > 0 ? "completed" : currentStep === 0 ? "inProgress" : "pending"} 
        />
        <StepperItems 
          label="Step 2" 
          state={currentStep > 1 ? "completed" : currentStep === 1 ? "inProgress" : "pending"} 
        />
        <StepperItems 
          label="Step 3" 
          state={currentStep > 2 ? "completed" : currentStep === 2 ? "inProgress" : "pending"} 
        />
      </Stepper>
      <div>
        <Button 
          variant="secondary" 
          size="S"
          label="Previous"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        />
        <Button 
          variant="primary" 
          size="S"
          label="Next"
          onClick={handleNext}
          disabled={currentStep === totalSteps - 1}
        />
      </div>
    </div>
  );
};
```

```typescript
// Modal with close handling
const ModalWithActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button 
        variant="primary"
        label="Open Modal"
        onClick={handleOpen}
      />
      <Modal 
        isOpen={isOpen}
        onClose={handleClose}
      >
        <div>Modal Content</div>
      </Modal>
    </>
  );
};
```
```typescript
// Form with validation
const FormWithValidation = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Handle form submission
      console.log('Form submitted:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />
      <Input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />
      <Button 
        type="submit"
        variant="primary"
        label="Submit"
      />
    </form>
  );
};
```

### Adding New Components

1. Create your component in `src/components/ComponentName/`
2. Add corresponding stories in `src/stories/`
3. Add documentation in `src/docs/` using MDX
4. Export the component in `src/index.ts`

### Dependencies Management

- All dependencies should be added as devDependencies since this is a component library
- Use the following command to add new dependencies:
```bash
yarn add -D package-name
```

### Best Practices

- Use functional React components
- Write TypeScript interfaces for all props
- Include proper documentation
- Add unit tests for components
- Follow the established folder structure

## 📦 Using Components in Other Projects

To use these components in another project:

1. Install the package:
```bash
yarn add storybook-superlink
```

2. Import components:
```typescript
import { ComponentName } from 'storybook-superlink';
```

## 🧪 Testing

Run tests using:
```bash
yarn test
```

## 📝 Documentation

All component documentation is available in Storybook. Run `yarn storybook` to view the interactive documentation.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📦 Building the Library

### Rollup Configuration

The library uses Rollup for bundling. The configuration is set up to:
- Generate ESM and CommonJS builds
- Handle TypeScript files
- Process CSS modules
- Generate type definitions
- Preserve the module structure

### Build Commands

To build the library:
```bash
yarn build
```

This will:
1. Generate the production build in the `dist` folder
2. Create type definitions
3. Output both ESM and CommonJS formats

The build output structure will be:
```
dist/
├── cjs/          # CommonJS build
├── esm/          # ESM build
├── types/        # TypeScript definitions
└── package.json  # Package entry points
```

### Publishing

To publish a new version:
1. Update the version in `package.json`
2. Build the library
3. Publish to npm:
```bash
yarn publish
```