// Email validation utilities with ListID verification

export interface EmailValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
  listId?: string;
}

export interface ListIDConfig {
  id: string;
  name: string;
  description: string;
  category: string;
  isActive: boolean;
}

// Predefined ListIDs for different newsletter categories
export const NEWSLETTER_LIST_IDS: Record<string, ListIDConfig> = {
  "japan-travel": {
    id: "japan-travel",
    name: "Japan Travel Newsletter",
    description: "General Japan travel tips and guides",
    category: "travel",
    isActive: true,
  },
  destinations: {
    id: "destinations",
    name: "Destination Updates",
    description: "Updates about specific destinations in Japan",
    category: "destinations",
    isActive: true,
  },
  "food-culture": {
    id: "food-culture",
    name: "Food & Culture",
    description: "Japanese food guides and cultural insights",
    category: "food",
    isActive: true,
  },
  seasonal: {
    id: "seasonal",
    name: "Seasonal Updates",
    description: "Seasonal events, festivals, and travel tips",
    category: "seasonal",
    isActive: true,
  },
  deals: {
    id: "deals",
    name: "Travel Deals",
    description: "Special offers and travel deals for Japan",
    category: "deals",
    isActive: true,
  },
};

// Email validation with ListID verification
export function validateEmailWithListID(
  email: string,
  listId?: string,
  options: {
    checkDisposable?: boolean;
    checkMX?: boolean;
    strictMode?: boolean;
  } = {}
): EmailValidationResult {
  const result: EmailValidationResult = {
    isValid: false,
    errors: [],
    warnings: [],
    suggestions: [],
  };

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    result.errors.push("Invalid email format");
    return result;
  }

  // Check email length
  if (email.length > 254) {
    result.errors.push("Email address is too long");
    return result;
  }

  // Check for common typos and suggest corrections
  const suggestions = suggestEmailCorrections(email);
  if (suggestions.length > 0) {
    result.suggestions = suggestions;
  }

  // Validate ListID if provided
  if (listId) {
    const listConfig = NEWSLETTER_LIST_IDS[listId];
    if (!listConfig) {
      result.errors.push(`Invalid ListID: ${listId}`);
      return result;
    }
    if (!listConfig.isActive) {
      result.errors.push(`ListID ${listId} is not active`);
      return result;
    }
    result.listId = listId;
  }

  // Check for disposable email domains (if enabled)
  if (options.checkDisposable) {
    const disposableDomains = [
      "10minutemail.com",
      "guerrillamail.com",
      "tempmail.org",
      "mailinator.com",
      "throwaway.email",
      "temp-mail.org",
      "sharklasers.com",
      "getairmail.com",
      "mailnesia.com",
      "yopmail.com",
      "trashmail.com",
      "maildrop.cc",
      "mailinator.net",
      "tempmailaddress.com",
      "fakeinbox.com",
      "spam4.me",
      "bccto.me",
      "chacuo.net",
      "dispostable.com",
      "mailmetrash.com",
    ];

    const domain = email.split("@")[1]?.toLowerCase();
    if (domain && disposableDomains.includes(domain)) {
      result.warnings.push("Disposable email detected");
      if (options.strictMode) {
        result.errors.push("Disposable email addresses are not allowed");
        return result;
      }
    }
  }

  // Check for common spam patterns
  const spamPatterns = [
    /^test@/i,
    /^admin@/i,
    /^info@/i,
    /^noreply@/i,
    /^no-reply@/i,
    /^donotreply@/i,
    /^do-not-reply@/i,
  ];

  for (const pattern of spamPatterns) {
    if (pattern.test(email)) {
      result.warnings.push("Email appears to be a test or system email");
      break;
    }
  }

  // If we get here, the email is valid
  result.isValid = true;
  return result;
}

// Suggest email corrections for common typos
function suggestEmailCorrections(email: string): string[] {
  const suggestions: string[] = [];
  const [localPart, domain] = email.split("@");

  if (!domain) return suggestions;

  // Common domain typos
  const domainCorrections: Record<string, string> = {
    "gmai.com": "gmail.com",
    "gmal.com": "gmail.com",
    "gmil.com": "gmail.com",
    "gamil.com": "gmail.com",
    "gmial.com": "gmail.com",
    "gmeil.com": "gmail.com",
    "gmali.com": "gmail.com",
    "hotmai.com": "hotmail.com",
    "hotmal.com": "hotmail.com",
    "hotmil.com": "hotmail.com",
    "hotmial.com": "hotmail.com",
    "hotmeil.com": "hotmail.com",
    "hotmali.com": "hotmail.com",
    "yahooo.com": "yahoo.com",
    "yaho.com": "yahoo.com",
    "yhoo.com": "yahoo.com",
    "outlok.com": "outlook.com",
  };

  const correctedDomain = domainCorrections[domain.toLowerCase()];
  if (correctedDomain) {
    suggestions.push(`${localPart}@${correctedDomain}`);
  }

  return suggestions;
}

// Get available ListIDs for a given category
export function getListIDsByCategory(category: string): ListIDConfig[] {
  return Object.values(NEWSLETTER_LIST_IDS).filter(
    (list) => list.category === category && list.isActive
  );
}

// Get all active ListIDs
export function getActiveListIDs(): ListIDConfig[] {
  return Object.values(NEWSLETTER_LIST_IDS).filter((list) => list.isActive);
}

// Validate ListID format
export function isValidListID(listId: string): boolean {
  return /^[a-z0-9-]+$/.test(listId) && listId.length <= 50;
}

// Sanitize email address
export function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// Generate a verification token for email verification
export function generateVerificationToken(): string {
  const crypto = require("crypto");
  return crypto.randomBytes(32).toString("hex");
}

// Validate verification token format
export function isValidVerificationToken(token: string): boolean {
  return /^[a-f0-9]{64}$/.test(token);
}

// Third-party email validation using Abstract API
export async function validateEmailWithAbstractAPI(email: string): Promise<{
  isValid: boolean;
  score: number;
  deliverability: string;
  isDisposable: boolean;
  isCatchAll: boolean;
  isRole: boolean;
  domain: string;
  reason?: string;
}> {
  const API_KEY = process.env.ABSTRACT_API_KEY;
  
  if (!API_KEY) {
    console.warn("ABSTRACT_API_KEY not set, skipping third-party validation");
    return {
      isValid: false,
      score: 0,
      deliverability: "unknown",
      isDisposable: false,
      isCatchAll: false,
      isRole: false,
      domain: "",
      reason: "API key not configured"
    };
  }

  try {
    const response = await fetch(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${API_KEY}&email=${encodeURIComponent(email)}`
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      isValid: data.is_valid_format?.value || false,
      score: data.score || 0,
      deliverability: data.deliverability || "unknown",
      isDisposable: data.is_disposable_email?.value || false,
      isCatchAll: data.is_catch_all_email?.value || false,
      isRole: data.is_role_email?.value || false,
      domain: data.domain || "",
      reason: data.reason || undefined
    };
  } catch (error) {
    console.error("Third-party email validation failed:", error);
    return {
      isValid: false,
      score: 0,
      deliverability: "error",
      isDisposable: false,
      isCatchAll: false,
      isRole: false,
      domain: "",
      reason: "Validation service unavailable"
    };
  }
}

// Enhanced validation with third-party service
export async function validateEmailWithThirdParty(
  email: string, 
  listId: string,
  options: {
    checkDisposable?: boolean;
    strictMode?: boolean;
    useThirdParty?: boolean;
  } = {}
): Promise<EmailValidationResult> {
  const {
    checkDisposable = true,
    strictMode = true,
    useThirdParty = false
  } = options;

  // First, do our local validation
  const localValidation = validateEmailWithListID(email, listId, {
    checkDisposable,
    strictMode
  });

  // If local validation fails, return early
  if (!localValidation.isValid) {
    return localValidation;
  }

  // If third-party validation is enabled, enhance with external service
  if (useThirdParty) {
    try {
      const thirdPartyResult = await validateEmailWithAbstractAPI(email);
      
      // Enhance the result with third-party data
      const enhancedResult: EmailValidationResult = {
        ...localValidation,
        warnings: [...localValidation.warnings],
        suggestions: [...localValidation.suggestions]
      };

      // Add third-party warnings
      if (thirdPartyResult.isDisposable && !enhancedResult.warnings.includes("Disposable email detected")) {
        enhancedResult.warnings.push("Disposable email detected (verified)");
      }

      if (thirdPartyResult.isCatchAll) {
        enhancedResult.warnings.push("Catch-all email address detected");
      }

      if (thirdPartyResult.isRole) {
        enhancedResult.warnings.push("Role-based email address detected");
      }

      if (thirdPartyResult.deliverability === "undeliverable") {
        enhancedResult.isValid = false;
        enhancedResult.errors.push("Email address appears to be undeliverable");
      }

      if (thirdPartyResult.score < 0.5) {
        enhancedResult.warnings.push("Low email quality score");
      }

      return enhancedResult;
    } catch (error) {
      console.warn("Third-party validation failed, falling back to local validation:", error);
      return localValidation;
    }
  }

  return localValidation;
}
