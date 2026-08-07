// src/components/layout/Container.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Container component that constrains content width and applies responsive horizontal padding.
 * Uses CSS variables defined in index.css for max width and padding.
 */
export default function Container({ children }) {
  return <div className="container" style={{ maxWidth: 'var(--max-content-width)', margin: '0 auto' }}>{children}</div>;
}

Container.propTypes = {
  children: PropTypes.node,
};
Container.defaultProps = {
  children: null,
};

export function Section({ children, className = '' }) {
  return <section className={`section ${className}`.trim()}>{children}</section>;
}

Section.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
Section.defaultProps = {
  children: null,
  className: '',
};

export function Grid({ children, className = '' }) {
  return <div className={`grid ${className}`.trim()}>{children}</div>;
}

Grid.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
Grid.defaultProps = {
  children: null,
  className: '',
};

export function PageHeader({ title, subtitle }) {
  return (
    <div className="page-header" style={{ marginBottom: 0 }}>
      <div className="page-title-group">
        <h1 className="page-title" style={{ fontSize: '38px', letterSpacing: '-0.03em' }}>{title}</h1>
        {subtitle && <p className="page-subtitle" style={{ fontSize: '15px' }}>{subtitle}</p>}
      </div>
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};
PageHeader.defaultProps = {
  subtitle: null,
};

export function Card({ children, className = '' }) {
  return <div className={`card ${className}`.trim()}>{children}</div>;
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
Card.defaultProps = {
  children: null,
  className: '',
};

export function MetricCard({ label, icon, value, footer }) {
  return (
    <Card className="metric-card" style={{ padding: 'var(--space-24)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-16)' }}>
        <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</span>
        <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-primary)', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
      </div>
      <div style={{ fontSize: '34px', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</div>
      {footer && <div style={{ fontSize: '12.5px', color: 'var(--status-success)', marginTop: 'var(--space-16)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>{footer}</div>}
    </Card>
  );
}

MetricCard.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node,
};
MetricCard.defaultProps = {
  footer: null,
};

export function ContentPanel({ children, className = '' }) {
  return (
    <Card className={className} style={{ padding: 'var(--space-32)' }}>
      {children}
    </Card>
  );
}

ContentPanel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
ContentPanel.defaultProps = {
  children: null,
  className: '',
};
