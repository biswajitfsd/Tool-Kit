---
name: New Tool Request
about: Suggest a new tool for the toolkit
title: '[TOOL] '
labels: enhancement, tool
assignees: ''
---

## 🔧 [Tool Name]

### Description

Provide a clear and concise description of the tool and what problem it solves.

### Features

#### Core Functionality

-   [ ] Feature 1
-   [ ] Feature 2
-   [ ] Feature 3
-   [ ] Feature 4

#### User Interface

-   [ ] Modern card-based design matching toolkit theme
-   [ ] Intuitive controls and inputs
-   [ ] Real-time feedback/results
-   [ ] Dark/Light theme support
-   [ ] Responsive design (mobile, tablet, desktop)

#### Additional Features (Optional)

-   [ ] Additional feature 1
-   [ ] Additional feature 2
-   [ ] Additional feature 3

### Technical Requirements

#### File Structure

```
tools/[tool-name]/
├── index.html
├── style.css
└── app.js
```

#### Design Specifications

-   Gradient background color: `#______`
-   Follow existing color scheme from `common.css`
-   Responsive design (mobile-first)
-   Smooth animations and transitions
-   Floating navigation menu with theme toggle

#### Special Considerations

List any specific technical requirements, APIs needed, or security considerations.

### User Flow

1. User lands on tool page
2. User interacts with controls
3. Tool processes input/performs action
4. Results are displayed
5. User can copy/save/export results (if applicable)

### Acceptance Criteria

-   [ ] Core functionality works as expected
-   [ ] Responsive design works on all devices
-   [ ] Theme toggle works properly
-   [ ] Smart navigation hides current page link
-   [ ] localStorage persists user preferences (if applicable)
-   [ ] Accessibility: Keyboard navigation and screen reader support
-   [ ] Cross-browser compatibility (Chrome, Firefox, Safari, Edge)

### Design Reference

Follow the design pattern from existing tools:

-   `/tools/countdown-timer` - Card layout and buttons
-   `/tools/clock` - Display area styling
-   `/tools/todo` - Interactive controls and animations

### Priority

-   [ ] High - Essential tool
-   [ ] Medium - Nice to have
-   [ ] Low - Future consideration

### Estimated Effort

Provide an estimate: 1-2 hours / 3-4 hours / 5+ hours

---

**Additional Notes:**
Add any other context, mockups, or references here.

**Related Issues:**
Link any related issues or tools.
