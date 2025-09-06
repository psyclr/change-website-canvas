# Change Website Canvas - Agent Coordination Protocol

## Overview
This document defines the coordination protocol for the Change Website Canvas project's MCP agent system. All task routing follows the Primary Agent → @task-manager → Specialist Agent pattern.

## Task-Manager Central Dispatch System

### Core Responsibilities
The @task-manager serves as the central dispatcher and MUST handle:

1. **Task Analysis**: Receive and analyze all non-trivial tasks from Primary Agent
2. **Agent Selection**: Use agent registry to match tasks with appropriate specialists  
3. **Task Delegation**: Create tasks in MCP Memory and assign to selected agents
4. **Progress Monitoring**: Track execution and coordinate multi-agent workflows
5. **Quality Assurance**: Ensure task completion meets project requirements

### Agent Selection Logic for Change Website Canvas

#### Frontend Development Tasks
**Keywords**: react, typescript, components, ui, tailwind, hooks, jsx, frontend
**Agent**: `frontend-specialist`
**Scenarios**: Component creation, state management, React patterns, TypeScript implementation

#### User Experience Optimization
**Keywords**: ux, conversion, brief, flow, interaction, usability, journey
**Agent**: `ux-interaction-designer`  
**Scenarios**: Brief flow optimization, conversion improvement, user journey mapping

#### AI Integration Tasks
**Keywords**: ai, openai, claude, nlp, conversation, api, chatbot, integration
**Agent**: `ai-integration-engineer`
**Scenarios**: API integrations, dynamic questioning, conversation memory, AI workflows

#### Form Development
**Keywords**: forms, validation, conversion, lead, optimization, multi-step
**Agent**: `form-optimization-specialist`
**Scenarios**: Multi-step forms, validation logic, lead qualification, completion optimization

#### Animation & Interactions
**Keywords**: animation, framer-motion, transitions, scroll, microinteractions
**Agent**: `animation-motion-designer`
**Scenarios**: Page transitions, scroll animations, visual feedback, micro-interactions

#### Performance Optimization
**Keywords**: performance, optimization, vite, bundling, vitals, loading, metrics
**Agent**: `performance-optimization-engineer`  
**Scenarios**: Bundle optimization, Web Vitals, code splitting, performance monitoring

#### Widget Development
**Keywords**: embedding, widget, iframe, plugin, integration, cross-domain
**Agent**: `embedding-integration-specialist`
**Scenarios**: Embeddable widgets, third-party integrations, iframe security

#### Landing Page Optimization
**Keywords**: landing, seo, conversion, cta, analytics, structure, optimization
**Agent**: `landing-page-optimizer`
**Scenarios**: Page structure, SEO, conversion tracking, analytics integration

## Communication Protocol

### Task Submission Format
```json
{
  "task_id": "unique-identifier",
  "from": "primary",
  "to": "task-manager",
  "task_description": "Clear description of what needs to be accomplished",
  "context": {
    "requirements": ["specific requirement 1", "requirement 2"],
    "constraints": ["constraint 1", "constraint 2"],
    "priority": "high|normal|low",
    "user_context": "Additional context from user request"
  },
  "timestamp": "2025-09-04T20:00:00Z"
}
```

### Task Delegation Format
```json
{
  "task_id": "unique-identifier", 
  "from": "task-manager",
  "to": "selected-specialist-agent",
  "task_description": "Refined task description with technical details",
  "context": {
    "requirements": ["detailed technical requirements"],
    "constraints": ["architectural constraints", "performance requirements"],
    "priority": "high|normal|low",
    "selected_reason": "Why this agent was chosen",
    "coordination_notes": "Additional coordination information"
  },
  "resources": {
    "files": ["list of relevant files"],
    "components": ["relevant components"],
    "apis": ["relevant APIs or integrations"]
  },
  "timestamp": "2025-09-04T20:05:00Z"
}
```

## Project-Specific Guidelines

### Change Website Canvas Focus Areas

#### Interactive Brief System
- **Primary Agent**: `ux-interaction-designer` for flow optimization
- **Secondary Agent**: `form-optimization-specialist` for form logic
- **Supporting Agent**: `ai-integration-engineer` for dynamic questioning

#### Landing Page Development
- **Primary Agent**: `frontend-specialist` for React components
- **Secondary Agent**: `landing-page-optimizer` for conversion optimization
- **Supporting Agent**: `animation-motion-designer` for interactions

#### AI Integration Layer
- **Primary Agent**: `ai-integration-engineer` for API integration
- **Secondary Agent**: `frontend-specialist` for UI components
- **Supporting Agent**: `form-optimization-specialist` for dynamic forms

#### Performance & Embedding
- **Primary Agent**: `performance-optimization-engineer` for optimization
- **Secondary Agent**: `embedding-integration-specialist` for widget development
- **Supporting Agent**: `frontend-specialist` for component optimization

## Memory Namespace Usage

### Active Status Tracking
- `agent:status:task-manager` - Central dispatcher status
- `agent:status:{specialist}` - Individual agent activity tracking

### Knowledge Sharing
- `agent:knowledge:task-manager` - Coordination insights and patterns
- `agent:knowledge:{specialist}` - Domain-specific learning and optimizations

### Project Context  
- `project:context:change-website-canvas` - Shared project state
- `coordination:queue:change-website-canvas` - Task communication queue

### Session Management
- `session:context` - Current session state and user preferences

## Quality Gates

### Pre-Delegation Checklist
- [ ] Task clearly defined with measurable outcomes
- [ ] Appropriate agent selected based on keywords and capabilities
- [ ] Required context and resources identified
- [ ] Dependencies and constraints documented
- [ ] Success criteria established

### Post-Completion Validation
- [ ] Task requirements fully met
- [ ] Code quality standards satisfied
- [ ] Performance impacts assessed
- [ ] Documentation updated
- [ ] Knowledge base updated with learnings

## Emergency Protocols

### Task Escalation
If a specialist agent cannot complete a task:
1. Agent updates status with blocker information
2. @task-manager reassesses and may reassign
3. Multi-agent collaboration initiated if needed
4. Primary Agent notified of any delays or issues

### Resource Conflicts
When multiple agents need the same resources:
1. @task-manager coordinates resource allocation
2. Tasks prioritized based on business impact
3. Dependency chains managed to prevent deadlocks
4. Progress tracked in MCP Memory

---

**Last Updated**: 2025-09-04T20:00:00Z  
**Version**: 1.0
**Project**: Change Website Canvas