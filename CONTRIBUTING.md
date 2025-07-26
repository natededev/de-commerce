# Contributing to DE-Commerce

Thank you for your interest in contributing to DE-Commerce! This document provides guidelines and information for contributors.

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our code of conduct:

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Maintain professionalism in all interactions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 8+
- Git
- Code editor (VS Code recommended)
- Supabase account for testing

### Development Setup

1. **Fork and Clone**

# Contributing to DE-Commerce

Thank you for your interest in contributing! This guide will help you get started and ensure your contributions fit the latest modular codebase and onboarding process.

---

## 🏁 Getting Started

1. **Fork the repository**
2. **Clone your fork**
3. **Run `setup.bat` (Windows) or follow [DEVELOPMENT.md](DEVELOPMENT.md) for Mac/Linux**
   - This installs all dependencies and creates `.env` files if missing
4. **Create a new branch for your feature or fix**

---

## 🛠️ Development Workflow

1. Install dependencies (if not already done by setup):
   ```bash
   npm install
   ```
2. Start dev servers:
   ```bash
   cd backend && npm run dev
   # In a new terminal:
   cd frontend && npm run dev
   ```
3. Write code and tests (see [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for modular layout)
4. Run linter, type-check, and tests before committing
5. Commit using [Conventional Commits](https://www.conventionalcommits.org/)
6. Push and open a pull request

---

## 🧑‍💻 Code Guidelines

### TypeScript

- Use strict types, avoid `any`
- Export types from `src/types/index.ts`
- Prefer interfaces over types

### React

- Use functional components and hooks
- Use Context for global state
- Add error boundaries where needed

### Code Quality

Run before committing:
```bash
npm run lint
npm run type-check
npm run format
npm run test
```

### File Structure

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for details on modular services, features, and utilities.

---

## 🧪 Testing

- Write unit tests for new features
- Use React Testing Library (frontend)
- Use Vitest (backend & frontend)
- Mock external dependencies

---

## 📝 Documentation

- Add JSDoc comments for functions
- Document complex logic
- Update README and relevant docs

---

## 🚀 Submitting a PR

1. Ensure all tests pass
2. Update documentation
3. Use clear PR titles and descriptions
4. Link related issues
5. Add screenshots for UI changes

---

## 🤝 Community

- Be respectful and helpful
- Welcome newcomers
- Use GitHub Issues for bugs/features
- Use Discussions for questions

Thank you for making DE-Commerce better!

## 🔍 Code Style Guidelines

### TypeScript

- Use strict TypeScript configuration
- Avoid `any` types - use proper type definitions
- Export types from `src/types/index.ts`
- Use interface over type when possible

### React

- Use functional components with hooks
- Implement proper error boundaries
- Use React Context for global state
- Follow React best practices

### Code Quality

```bash
# Run before committing
npm run lint          # ESLint check
npm run type-check    # TypeScript check
npm run format        # Prettier formatting
npm run test          # Run tests
```

### File Structure

```
src/
├── components/       # Reusable UI components
├── features/         # Feature-specific modules
├── pages/           # Page components
├── hooks/           # Custom React hooks
├── contexts/        # React Context providers
├── lib/             # Utility functions
├── types/           # TypeScript definitions
└── test/            # Test files
```

## 🧪 Testing Guidelines

### Frontend Testing

- Write unit tests for components
- Use React Testing Library
- Test user interactions
- Mock external dependencies

### Backend Testing

- Write unit tests for services
- Test API endpoints
- Mock database calls
- Test error scenarios

### Running Tests

```bash
npm run test                 # All tests
npm run test:frontend        # Frontend only
npm run test:backend         # Backend only
npm run test:coverage        # With coverage
```

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for functions
- Document complex logic
- Include usage examples
- Keep README.md updated

### API Documentation

- Document all endpoints
- Include request/response examples
- Update OpenAPI specs
- Add error codes

## 🚀 Performance Guidelines

### Frontend

- Optimize bundle size
- Use lazy loading for routes
- Minimize re-renders
- Optimize images and assets

### Backend

- Implement proper caching
- Optimize database queries
- Use compression middleware
- Handle errors gracefully

## 🐛 Debugging

### Common Issues

1. **Environment variables not loaded**
   - Check `.env` file location
   - Restart development server

2. **TypeScript errors**
   - Run `npm run type-check`
   - Check import paths

3. **Test failures**
   - Clear test cache
   - Check mock implementations

### Debug Tools

- React Developer Tools
- VS Code debugger
- Browser DevTools
- Network inspection

## 📦 Release Process

### Version Numbering

- Follow semantic versioning (semver)
- Major: Breaking changes
- Minor: New features
- Patch: Bug fixes

### Release Checklist

- [ ] All tests pass
- [ ] Documentation updated
- [ ] Version bumped
- [ ] Changelog updated
- [ ] Production tested

## 🙋‍♀️ Getting Help

### Resources

- [Project Documentation](./README.md)
- [API Documentation](./docs/api.md)
- [Deployment Guide](./DEPLOYMENT.md)

### Support Channels

- GitHub Issues for bugs and features
- GitHub Discussions for questions
- Email: hello@natede.dev

### Community

- Be respectful and helpful
- Share knowledge and resources
- Welcome newcomers
- Celebrate contributions

## 🎯 Areas for Contribution

### High Priority

- Bug fixes and security issues
- Performance improvements
- Test coverage increase
- Documentation improvements

### Feature Requests

- Payment gateway integrations (e.g., Stripe) — not currently active
- Advanced search and filtering
- User dashboard enhancements
- Mobile app development

### Good First Issues

- UI/UX improvements
- Code cleanup and refactoring
- Documentation updates
- Test additions

Thank you for contributing to DE-Commerce! Your help makes this project better for everyone. 🚀
