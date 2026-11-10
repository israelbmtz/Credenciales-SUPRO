import React, { useState, useRef } from 'react';
import { BadgeData, BadgeSettings, PrintLayoutMode } from './types/badge';
import { Badge3DViewer } from './components/Badge3DViewer';
import { PrintSheet } from './components/PrintSheet';
import { BadgeEditor } from './components/BadgeEditor';
import { VerificationModal } from './components/VerificationModal';
import { toPng } from 'html-to-image';
import {
  Printer,
  ShieldCheck,
  CheckCircle,
  Users,
  UserPlus,
  UserCheck
} from 'lucide-react';

const PRESET_EMPLOYEES: BadgeData[] = [
  {
    id: 'israel-balderas',
    fullName: 'Israel Balderas Martínez',
    jobTitle: 'Proveedor Quirúrgico',
    employeeId: '0919',
    department: 'Ortopedia y Traumatología',
    companyName: 'SUPRO México',
    companySubtitle: 'Surgical Providers in Orthopedics',
    bloodType: '',
    emergencyContact: '',
    emergencyPhone: '',
    curp: 'BAMI880919HDFR02',
    issueDate: '2026',
    expiryDate: '2028',
    authorizedBy: 'Dirección General de Operaciones',
    hospitalAccessLevel: 'Quirófano & CEYE',
    customNotes: 'Acreditación autorizada para asistencia técnica en artroplastia y reemplazos articulares.',
    photoUrl: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_1.23.08_PM_21360bdf.jpeg',
    logoUrl: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_1.26.24_PM_c8537b53.jpeg',
    backgroundUrl: '/assets/aistudio/WhatsApp_Image_2026-09-08_at_9.34.47_AM_0adf4691.jpeg',
    companyEmail: 'supro_mexico@hotmail.com',
    companyPhone: '55 4035 5654',
    employeePhone: '',
  },
  {
    id: 'jose-garcia',
    fullName: 'José Alberto García Barrera',
    jobTitle: 'Proveedor Quirúrgico',
    employeeId: '1017',
    department: 'Ortopedia y Traumatología',
    companyName: 'SUPRO México',
    companySubtitle: 'Surgical Providers in Orthopedics',
    bloodType: '',
    emergencyContact: '',
    emergencyPhone: '',
    curp: 'GABA891017HDFR05',
    issueDate: '2026',
    expiryDate: '2028',
    authorizedBy: 'Dirección General de Operaciones',
    hospitalAccessLevel: 'Quirófano & CEYE',
    customNotes: 'Acreditación autorizada para asistencia técnica en artroplastia y reemplazos articulares.',
    photoUrl: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_1.34.22_PM_28a33f08.jpeg',
    logoUrl: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_1.26.24_PM_c8537b53.jpeg',
    backgroundUrl: '/assets/aistudio/WhatsApp_Image_2026-09-08_at_9.34.47_AM_0adf4691.jpeg',
    companyEmail: 'supro_mexico@hotmail.com',
    companyPhone: '55 5402 5792',
    employeePhone: '55 5402 5792',
  },
];

const INITIAL_SETTINGS: BadgeSettings = {
  orientation: 'vertical',
  theme: 'medical-blue',
  showSlotPunch: true,
  showHologram: true,
  showChip: true,
  showBarcode: true,
  showQrCode: true,
  photoFilter: 'none',
  photoShape: 'rounded',
  borderStyle: 'titanium',
};

export default function App() {
  const [employees, setEmployees] = useState<BadgeData[]>(PRESET_EMPLOYEES);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>(PRESET_EMPLOYEES[1].id); // Select José Alberto or toggle
  const [settings, setSettings] = useState<BadgeSettings>(INITIAL_SETTINGS);
  const [activeTab, setActiveTab] = useState<'preview' | 'print'>('preview');
  const [printLayoutMode, setPrintLayoutMode] = useState<PrintLayoutMode>('sheet-duplex');
  const [showCropMarks, setShowCropMarks] = useState<boolean>(true);
  const [includeLanyardGuides, setIncludeLanyardGuides] = useState<boolean>(true);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isVerificationOpen, setIsVerificationOpen] = useState<boolean>(false);

  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const currentEmployee =
    employees.find((e) => e.id === selectedEmployeeId) || employees[0];

  const handleUpdateCurrentEmployee = (newData: Partial<BadgeData>) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === currentEmployee.id ? { ...emp, ...newData } : emp
      )
    );
  };

  const handleSelectEmployee = (id: string) => {
    setSelectedEmployeeId(id);
    const target = employees.find((e) => e.id === id);
    if (target) {
      showToast(`Mostrando credencial de ${target.fullName}`);
    }
  };

  const handleAddNewEmployee = () => {
    const newId = `emp-${Date.now()}`;
    const newEmployee: BadgeData = {
      id: newId,
      fullName: 'Nuevo Empleado',
      jobTitle: 'Proveedor Quirúrgico',
      employeeId: '1018',
      department: 'Ortopedia y Traumatología',
      companyName: 'SUPRO México',
      companySubtitle: 'Surgical Providers in Orthopedics',
      bloodType: '',
      emergencyContact: '',
      emergencyPhone: '',
      curp: 'NUEV000000XXXXXX',
      issueDate: '2026',
      expiryDate: '2028',
      authorizedBy: 'Dirección General de Operaciones',
      hospitalAccessLevel: 'Quirófano & CEYE',
      customNotes: 'Acreditación autorizada para asistencia técnica en artroplastia.',
      photoUrl: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_1.34.22_PM_28a33f08.jpeg',
      logoUrl: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_1.26.24_PM_c8537b53.jpeg',
      backgroundUrl: '/assets/aistudio/WhatsApp_Image_2026-09-08_at_9.34.47_AM_0adf4691.jpeg',
      companyEmail: 'supro_mexico@hotmail.com',
      companyPhone: '55 4035 5654',
      employeePhone: '',
    };
    setEmployees((prev) => [...prev, newEmployee]);
    setSelectedEmployeeId(newId);
    showToast('Nueva credencial creada y seleccionada');
  };

  const handleUpdateSettings = (newSettings: Partial<BadgeSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const handleResetDefaults = () => {
    const original = PRESET_EMPLOYEES.find((p) => p.id === currentEmployee.id);
    if (original) {
      handleUpdateCurrentEmployee(original);
      showToast('Datos del empleado restablecidos');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleTriggerPrint = () => {
    setActiveTab('print');
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const handleExportPng = async (side: 'front' | 'back' | 'both') => {
    setIsExporting(true);
    showToast('Generando imagen en alta resolución 300 DPI...');

    try {
      if (side === 'front' && frontRef.current) {
        const dataUrl = await toPng(frontRef.current, { pixelRatio: 3, quality: 0.98 });
        const link = document.createElement('a');
        link.download = `Credencial_SUPRO_${currentEmployee.employeeId}_Anverso.png`;
        link.href = dataUrl;
        link.click();
        showToast('Anverso descargado con éxito');
      } else if (side === 'back' && backRef.current) {
        const dataUrl = await toPng(backRef.current, { pixelRatio: 3, quality: 0.98 });
        const link = document.createElement('a');
        link.download = `Credencial_SUPRO_${currentEmployee.employeeId}_Reverso.png`;
        link.href = dataUrl;
        link.click();
        showToast('Reverso descargado con éxito');
      } else if (side === 'both') {
        if (frontRef.current) {
          const frontUrl = await toPng(frontRef.current, { pixelRatio: 3 });
          const linkF = document.createElement('a');
          linkF.download = `Credencial_SUPRO_${currentEmployee.employeeId}_Frente.png`;
          linkF.href = frontUrl;
          linkF.click();
        }
        if (backRef.current) {
          const backUrl = await toPng(backRef.current, { pixelRatio: 3 });
          const linkB = document.createElement('a');
          linkB.download = `Credencial_SUPRO_${currentEmployee.employeeId}_Atras.png`;
          linkB.href = backUrl;
          linkB.click();
        }
        showToast('Ambas caras descargadas con éxito');
      }
    } catch (err) {
      console.error('Export error:', err);
      showToast('Error al generar la imagen. Intenta con Imprimir.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="no-print fixed bottom-6 right-6 z-50 bg-cyan-950 border border-cyan-400 text-cyan-200 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-bounce">
          <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar (Complies with Top Bar Contract: 3 zones separated by gap-8) */}
      <header className="no-print flex items-center justify-between gap-8 px-6 py-3.5 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
        {/* Zone 1: Brand wordmark in display face */}
        <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-600/30">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-base font-extrabold tracking-tight text-white font-display">
              SUPRO México
            </span>
            <span className="hidden sm:inline text-xs text-slate-400 font-normal ml-2">
              Credencial Quirúrgica CR80
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('preview')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'preview' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Vista Previa 3D
          </button>
          <button
            onClick={() => setActiveTab('print')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'print' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Plantilla de Impresión CR80
          </button>
          <button
            onClick={() => setIsVerificationOpen(true)}
            className="transition-colors whitespace-nowrap shrink-0 hover:text-cyan-300 text-slate-400"
          >
            Validación de Acreditación
          </button>
        </nav>

        {/* Zone 3: 1 Primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleTriggerPrint}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-lg shadow-lg shadow-cyan-500/20 transition-all whitespace-nowrap shrink-0 cursor-pointer active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir Credencial</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Employee Switcher Bar (Guarda y permite alternar entre Israel y José Alberto) */}
        <div className="no-print mb-6 bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-lg flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mr-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>Credenciales Guardadas ({employees.length}):</span>
            </span>

            <div className="flex flex-wrap items-center gap-2">
              {employees.map((emp) => {
                const isSelected = emp.id === currentEmployee.id;
                return (
                  <button
                    key={emp.id}
                    onClick={() => handleSelectEmployee(emp.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                      isSelected
                        ? 'bg-cyan-600/30 text-cyan-300 border-cyan-400 shadow-md shadow-cyan-500/10'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <img
                      src={emp.photoUrl}
                      alt={emp.fullName}
                      className="w-5 h-5 rounded-full object-cover object-top border border-cyan-400/50"
                    />
                    <span>{emp.fullName}</span>
                    <span className="text-[10px] font-mono opacity-70">ID: {emp.employeeId}</span>
                    {isSelected && <UserCheck className="w-3.5 h-3.5 text-cyan-400" />}
                  </button>
                );
              })}

              <button
                onClick={handleAddNewEmployee}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium bg-slate-800 text-slate-400 hover:text-cyan-300 hover:bg-slate-700 border border-slate-700 transition-colors"
                title="Añadir otra credencial"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>+ Agregar</span>
              </button>
            </div>
          </div>

          {/* Quick tab toggle: Simulador vs Hoja de Impresión */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'preview'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Simulador 3D
            </button>
            <button
              onClick={() => setActiveTab('print')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'print'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Hoja de Impresión
            </button>
          </div>
        </div>

        {/* Sub-header info kicker */}
        <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span>SUPRO México</span>
              <span aria-hidden="true">·</span>
              <span>Surgical Providers in Orthopedics</span>
              <span aria-hidden="true">·</span>
              <span className="text-cyan-400 font-mono">ID: {currentEmployee.employeeId}</span>
              {currentEmployee.employeePhone && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-300 font-mono">Tel: {currentEmployee.employeePhone}</span>
                </>
              )}
            </div>
            <h1 className="text-2xl font-extrabold text-white font-display tracking-tight">
              Credencial Corporativa de {currentEmployee.fullName}
            </h1>
          </div>
        </div>

        {/* Tab 1: Interactive 3D Card Simulator & Editor */}
        {activeTab === 'preview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: 3D Badge Interactive View */}
            <div className="lg:col-span-7 flex flex-col items-center bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 min-h-[600px] justify-center relative overflow-hidden">
              {/* Surgical glowing background halo */}
              <div className="absolute w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -top-10 -left-10" />
              <div className="absolute w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -bottom-10 -right-10" />

              <Badge3DViewer
                data={currentEmployee}
                settings={settings}
                onUpdateSettings={handleUpdateSettings}
                frontRef={frontRef}
                backRef={backRef}
              />
            </div>

            {/* Right 5 Columns: Badge Customizer & Details Editor */}
            <div className="lg:col-span-5">
              <BadgeEditor
                data={currentEmployee}
                settings={settings}
                onUpdateData={handleUpdateCurrentEmployee}
                onUpdateSettings={handleUpdateSettings}
                onResetDefaults={handleResetDefaults}
                onExportPng={handleExportPng}
                isExporting={isExporting}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Print Sheet (CR80 Physical Card Ready) */}
        {activeTab === 'print' && (
          <div className="w-full">
            <PrintSheet
              data={currentEmployee}
              settings={settings}
              allEmployees={employees}
              layoutMode={printLayoutMode}
              onLayoutModeChange={setPrintLayoutMode}
              showCropMarks={showCropMarks}
              onToggleCropMarks={setShowCropMarks}
              includeLanyardGuides={includeLanyardGuides}
              onToggleLanyardGuides={setIncludeLanyardGuides}
              onTriggerPrint={handleTriggerPrint}
            />
          </div>
        )}
      </main>

      {/* Hidden container for rendering high-res export targets */}
      <div className="sr-only opacity-0 pointer-events-none">
        <div ref={frontRef as any}>
          <div className="badge-card-print-vertical">
            {/* Target for html-to-image */}
          </div>
        </div>
      </div>

      {/* Verification Modal */}
      <VerificationModal
        isOpen={isVerificationOpen}
        onClose={() => setIsVerificationOpen(false)}
        data={currentEmployee}
      />

      {/* Footer */}
      <footer className="no-print mt-auto border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 SUPRO México · Surgical Providers in Orthopedics. Todos los derechos reservados.</p>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Formato Estándar CR80 (54 × 85.6 mm)</span>
            <span aria-hidden="true">·</span>
            <span>Acreditación Quirúrgica</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
