import { getPrivacyPolicyRoute, privacyPolicyPath } from './PrivacyPolicy';

test('privacy policy routes resolve to the correct language', () => {
  expect(getPrivacyPolicyRoute('/privacy-policy/')).toBe('ru');
  expect(getPrivacyPolicyRoute('/en/privacy-policy/')).toBe('en');
  expect(getPrivacyPolicyRoute('/privacy-policy-extra/')).toBeNull();
  expect(privacyPolicyPath('ru')).toBe('/privacy-policy/');
  expect(privacyPolicyPath('en')).toBe('/en/privacy-policy/');
});
