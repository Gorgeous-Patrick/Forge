import bcrypt from "bcryptjs";
import { hashPassword, verifyPassword } from "@/lib/auth";

// Mock bcryptjs
jest.mock("bcryptjs", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe("Auth Utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("hashPassword", () => {
    it("should hash a password with correct salt rounds", async () => {
      const password = "mySecurePassword123";
      const hashedPassword = "$2a$10$hashedPasswordString";

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      const result = await hashPassword(password);

      expect(result).toBe(hashedPassword);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
    });

    it("should handle hashing errors", async () => {
      const password = "password123";

      (bcrypt.hash as jest.Mock).mockRejectedValue(new Error("Hashing failed"));

      await expect(hashPassword(password)).rejects.toThrow("Hashing failed");
    });
  });

  describe("verifyPassword", () => {
    it("should return true when password matches hash", async () => {
      const password = "myPassword123";
      const hash = "$2a$10$correctHashString";

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await verifyPassword(password, hash);

      expect(result).toBe(true);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
    });

    it("should return false when password does not match hash", async () => {
      const password = "wrongPassword";
      const hash = "$2a$10$correctHashString";

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await verifyPassword(password, hash);

      expect(result).toBe(false);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
    });

    it("should handle verification errors", async () => {
      const password = "password123";
      const hash = "$2a$10$hashString";

      (bcrypt.compare as jest.Mock).mockRejectedValue(
        new Error("Comparison failed")
      );

      await expect(verifyPassword(password, hash)).rejects.toThrow(
        "Comparison failed"
      );
    });
  });
});
