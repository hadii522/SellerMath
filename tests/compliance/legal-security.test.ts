import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { siteConfig } from '../../lib/config/site';
import nextConfig from '../../next.config';

describe('Legal & Security Compliance Checks', () => {
  it('has centralized inquiries email set to hgoraya522@gmail.com in siteConfig', () => {
    assert.equal(siteConfig.contactEmail, 'hgoraya522@gmail.com');
    assert.equal(siteConfig.legalEmail, 'hgoraya522@gmail.com');
    assert.equal(siteConfig.securityEmail, 'hgoraya522@gmail.com');
  });

  it('provides an RFC 9116 compliant security.txt referencing mailto:hgoraya522@gmail.com', () => {
    const securityTxtPath = path.join(
      process.cwd(),
      'public',
      '.well-known',
      'security.txt'
    );
    assert.ok(
      fs.existsSync(securityTxtPath),
      'security.txt must exist under public/.well-known/security.txt'
    );

    const content = fs.readFileSync(securityTxtPath, 'utf-8');
    assert.match(
      content,
      /Contact:\s*mailto:hgoraya522@gmail\.com/i,
      'security.txt must define Contact: mailto:hgoraya522@gmail.com'
    );
    assert.match(
      content,
      /Expires:/i,
      'security.txt must define Expires header per RFC 9116'
    );
    assert.match(
      content,
      /Policy:/i,
      'security.txt should reference the policy page'
    );
  });

  it('verifies proprietary LICENSE file exists with All Rights Reserved and contact email', () => {
    const licensePath = path.join(process.cwd(), 'LICENSE');
    assert.ok(fs.existsSync(licensePath), 'LICENSE file must exist in project root');
    const content = fs.readFileSync(licensePath, 'utf-8');
    assert.match(content, /All Rights Reserved/i, 'Must declare All Rights Reserved');
    assert.match(content, /hgoraya522@gmail\.com/i, 'Must include owner contact email');
    assert.match(content, /RESTRICTIONS|ANTI-THEFT/i, 'Must include anti-theft clauses');
  });

  it('configures critical HTTP security headers in next.config.ts', async () => {
    assert.ok(
      typeof nextConfig.headers === 'function',
      'next.config.ts must declare a headers() async function'
    );

    const configuredHeaders = await nextConfig.headers();
    assert.ok(
      Array.isArray(configuredHeaders) && configuredHeaders.length > 0,
      'headers() must return an array of header rules'
    );

    const rootRule = configuredHeaders.find((r) => r.source === '/(.*)');
    assert.ok(rootRule, 'Must define a global header rule for /(.*)');

    const headerKeys = rootRule.headers.map((h: { key: string }) => h.key);
    assert.ok(
      headerKeys.includes('Strict-Transport-Security'),
      'Must configure Strict-Transport-Security (HSTS)'
    );
    assert.ok(
      headerKeys.includes('X-Frame-Options'),
      'Must configure X-Frame-Options'
    );
    assert.ok(
      headerKeys.includes('X-Content-Type-Options'),
      'Must configure X-Content-Type-Options'
    );
    assert.ok(
      headerKeys.includes('Referrer-Policy'),
      'Must configure Referrer-Policy'
    );
    assert.ok(
      headerKeys.includes('Content-Security-Policy'),
      'Must configure Content-Security-Policy (CSP)'
    );
    assert.ok(
      headerKeys.includes('Permissions-Policy'),
      'Must configure Permissions-Policy'
    );

    // Check specific header values
    const nosniff = rootRule.headers.find(
      (h: { key: string }) => h.key === 'X-Content-Type-Options'
    );
    assert.equal(nosniff?.value, 'nosniff');

    const frame = rootRule.headers.find(
      (h: { key: string }) => h.key === 'X-Frame-Options'
    );
    assert.equal(frame?.value, 'SAMEORIGIN');
  });

  it('verifies legal and security files exist in the app directory', () => {
    const requiredPages = [
      'app/privacy-policy/page.tsx',
      'app/terms/page.tsx',
      'app/disclaimer/page.tsx',
      'app/security/page.tsx',
      'app/contact/page.tsx',
      'components/CookieBanner.tsx',
    ];

    for (const relPath of requiredPages) {
      const fullPath = path.join(process.cwd(), relPath);
      assert.ok(fs.existsSync(fullPath), `Page or component ${relPath} must exist`);
      const fileContent = fs.readFileSync(fullPath, 'utf-8');
      if (relPath !== 'app/disclaimer/page.tsx' && relPath !== 'components/CookieBanner.tsx') {
        assert.ok(
          fileContent.includes('hgoraya522@gmail.com') ||
            fileContent.includes('siteConfig.contactEmail') ||
            fileContent.includes('siteConfig.securityEmail'),
          `${relPath} must reference contact email or config token`
        );
      }
    }
  });
});
