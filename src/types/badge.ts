export interface BadgeData {
  fullName: string;
  jobTitle: string;
  employeeId: string;
  department: string;
  companyName: string;
  companySubtitle: string;
  bloodType: string;
  emergencyContact: string;
  emergencyPhone: string;
  curp: string;
  issueDate: string;
  expiryDate: string;
  authorizedBy: string;
  hospitalAccessLevel: string;
  customNotes: string;
  photoUrl: string;
  logoUrl: string;
  backgroundUrl: string;
  companyEmail: string;
  companyPhone: string;
}

export type BadgeOrientation = 'vertical' | 'horizontal';

export type BadgeColorTheme = 'medical-blue' | 'surgical-teal' | 'obsidian-titanium' | 'clean-white';

export interface BadgeSettings {
  orientation: BadgeOrientation;
  theme: BadgeColorTheme;
  showSlotPunch: boolean;
  showHologram: boolean;
  showChip: boolean;
  showBarcode: boolean;
  showQrCode: boolean;
  photoFilter: 'none' | 'bw' | 'cool-tint' | 'high-contrast';
  photoShape: 'rounded' | 'square' | 'circle';
  borderStyle: 'titanium' | 'minimal' | 'cyan-glow';
}

export type PrintLayoutMode = 'single-cr80' | 'sheet-duplex' | 'sheet-multi';
