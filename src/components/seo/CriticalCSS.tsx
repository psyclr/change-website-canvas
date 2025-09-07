import React from 'react';

/**
 * Critical CSS component that inlines essential styles for above-the-fold content
 * This component should be rendered in the <head> to prevent render-blocking CSS
 */
export const CriticalCSS: React.FC = () => {
  // Define critical CSS for above-the-fold content
  const criticalStyles = `
    /* CSS Reset and Base Styles */
    *,*::before,*::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}
    *::before,*::after{--tw-content:''}
    html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal}
    body{margin:0;line-height:inherit}
    
    /* Critical Layout Classes */
    .min-h-screen{min-height:100vh}
    .flex{display:flex}
    .flex-col{flex-direction:column}
    .items-center{align-items:center}
    .justify-center{justify-content:center}
    .justify-between{justify-content:space-between}
    .container{width:100%;max-width:1200px;margin-left:auto;margin-right:auto;padding-left:1rem;padding-right:1rem}
    
    /* Typography - Critical sizes only */
    .text-4xl{font-size:2.25rem;line-height:2.5rem}
    .text-5xl{font-size:3rem;line-height:1}
    .text-xl{font-size:1.25rem;line-height:1.75rem}
    .text-2xl{font-size:1.5rem;line-height:2rem}
    .font-bold{font-weight:700}
    .font-semibold{font-weight:600}
    .text-center{text-align:center}
    .leading-tight{line-height:1.25}
    
    /* Critical Colors */
    .text-white{color:#fff}
    .text-gray-900{color:#111827}
    .text-gray-600{color:#4b5563}
    .bg-white{background-color:#fff}
    .bg-gray-900{background-color:#111827}
    
    /* Critical Spacing */
    .p-4{padding:1rem}
    .px-4{padding-left:1rem;padding-right:1rem}
    .py-8{padding-top:2rem;padding-bottom:2rem}
    .py-16{padding-top:4rem;padding-bottom:4rem}
    .mb-4{margin-bottom:1rem}
    .mb-6{margin-bottom:1.5rem}
    .mb-8{margin-bottom:2rem}
    .space-y-4>:not([hidden])~:not([hidden]){margin-top:1rem}
    .space-y-6>:not([hidden])~:not([hidden]){margin-top:1.5rem}
    
    /* Critical Button Styles */
    .btn,.button{display:inline-flex;align-items:center;justify-content:center;rounded:0.375rem;padding:0.75rem 1.5rem;font-weight:500;transition:background-color 0.2s}
    .bg-blue-600{background-color:#2563eb}
    .bg-blue-700{background-color:#1d4ed8}
    .hover\\:bg-blue-700:hover{background-color:#1d4ed8}
    .px-6{padding-left:1.5rem;padding-right:1.5rem}
    .py-3{padding-top:0.75rem;padding-bottom:0.75rem}
    .rounded{border-radius:0.25rem}
    .rounded-md{border-radius:0.375rem}
    .rounded-lg{border-radius:0.5rem}
    
    /* Critical Utilities */
    .hidden{display:none}
    .block{display:block}
    .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}
    
    /* Header/Navigation Critical Styles */
    .sticky{position:sticky}
    .fixed{position:fixed}
    .top-0{top:0}
    .z-50{z-index:50}
    
    /* Grid for above-fold content */
    .grid{display:grid}
    .grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}
    
    /* Responsive - Mobile First Critical Breakpoints */
    @media(min-width:640px){
      .sm\\:text-5xl{font-size:3rem;line-height:1}
      .sm\\:text-6xl{font-size:3.75rem;line-height:1}
      .sm\\:px-6{padding-left:1.5rem;padding-right:1.5rem}
      .sm\\:py-20{padding-top:5rem;padding-bottom:5rem}
    }
    
    @media(min-width:768px){
      .md\\:text-6xl{font-size:3.75rem;line-height:1}
      .md\\:px-8{padding-left:2rem;padding-right:2rem}
      .md\\:py-24{padding-top:6rem;padding-bottom:6rem}
      .md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
    }
    
    @media(min-width:1024px){
      .lg\\:px-12{padding-left:3rem;padding-right:3rem}
      .lg\\:py-32{padding-top:8rem;padding-bottom:8rem}
    }
    
    /* Performance Critical - Prevent Layout Shift */
    .transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-timing-function:cubic-bezier(0.4,0,0.2,1);transition-duration:150ms}
    .duration-200{transition-duration:200ms}
    .duration-300{transition-duration:300ms}
    
    /* Loading states to prevent CLS */
    .skeleton{background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);background-size:200% 100%;animation:loading 1.5s infinite}
    @keyframes loading{0%{background-position:200% 0}100%{background-position:-200% 0}}
  `;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: criticalStyles
      }}
    />
  );
};

export default CriticalCSS;