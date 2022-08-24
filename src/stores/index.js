import { defineStore } from 'pinia'
import { updateStoreForValue, updateStoreForVolume, updateStoreForSimple, updateStoreForSpecial } from '../assets/comm.js'
export const useBaseStore = defineStore('base', {
    //id: 'base',
    state: () => ({
        sections: ['ACPI', 'Booter', 'DeviceProperties', 'Kernel', 'Misc', 'NVRAM', 'PlatformInfo', 'UEFI'],
        root: 'ACPI', //当前显示哪个节点
        configisfull: false, //是否full模式
        configisMOD: false, //是否OpenCore MOD版本
        textarea_content: '',            //保存粘贴页面时候textarea中的内容
        OCbuttons5: ['enabled', 'copy', 'paste', 'add', 'del'], //5个图标按钮
        OCbuttons4: ['copy', 'paste', 'add', 'del'], //4个图标按钮

        ACPI: {
            Add: [],
            Delete: [],
            Patch: [],
            Quirks: {
                FadtEnableReset: false,
                NormalizeHeaders: false,
                RebaseRegions: false,
                ResetHwSig: false,
                ResetLogoStatus: false,
                SyncTableIds: false,
                EnableForAll: false,
            },
        },

        Booter: {
            MmioWhitelist: [],
            Patch: [],
            Quirks: {
                AllowRelocationBlock: false,
                AvoidRuntimeDefrag: false,
                DevirtualiseMmio: false,
                DisableSingleUser: false,
                DisableVariableWrite: false,
                DiscardHibernateMap: false,
                EnableSafeModeSlide: false,
                EnableWriteUnprotector: false,
                ForceBooterSignature: false,
                ForceExitBootServices: false,
                ProtectMemoryRegions: false,
                ProtectSecureBoot: false,
                ProtectUefiServices: false,
                ProvideCustomSlide: false,
                ProvideMaxSlide: 0,
                RebuildAppleMemoryMap: false,
                ResizeAppleGpuBars: -1,
                SetupVirtualMap: false,
                SignalAppleOS: false,
                SyncRuntimePermissions: false,
                EnableForAll: false,
            },
        },

        DeviceProperties: {
            AddLeft: [],
            AddRight: [],
            DeleteLeft: [],
            DeleteRight: [],
        },

        Kernel: {
            Add: [],
            Block: [],
            Patch: [],
            Emulate: {
                Cpuid1Data: '',
                Cpuid1Mask: '',
                MaxKernel: '',
                MinKernel: '',
                DummyPowerManagement: false,
            },
            Scheme: {
                KernelArch: 'Auto',
                KernelCache: 'Auto',
                CustomKernel: false,
                FuzzyMatch: false,
            },
            Force: [],
            Quirks: {
                AppleCpuPmCfgLock: false,
                AppleXcpmCfgLock: false,
                AppleXcpmExtraMsrs: false,
                AppleXcpmForceBoost: false,
                CustomPciSerialDevice: false,
                CustomSMBIOSGuid: false,
                DisableIoMapper: false,
                DisableLinkeditJettison: false,
                DisableRtcChecksum: false,
                ExtendBTFeatureFlags: false,
                ExternalDiskIcons: false,
                ForceAquantiaEthernet: false,
                ForceSecureBootScheme: false,
                IncreasePciBarSize: false,
                LapicKernelPanic: false,
                LegacyCommpage: false,
                PanicNoKextDump: false,
                PowerTimeoutKernelPanic: false,
                ProvideCurrentCpuInfo: false,
                SetApfsTrimTimeout: -1,
                ThirdPartyDrives: false,
                XhciPortLimit: false,
            },
        },

        Misc: {
            BlessOverride: [],
            Boot: {
                HibernateMode: 'None',
                PickerMode: 'Builtin',
                PickerVariant: 'Auto',
                TakeoffDelay: '0',
                Timeout: '0',
                HideAuxiliary: false,
                LauncherOption: 'Disabled',
                LauncherPath: 'Default',
                ConsoleAttributes: '0',
                PickerAttributes: '0',
                PickerAudioAssist: false,
                PollAppleHotKeys: false,
                ShowPicker: false,
                SkipCustomEntryCheck: false,
            },
            Debug: {
                AppleDebug: false,
                ApplePanic: false,
                DisableWatchDog: false,
                DisplayDelay: '0',
                DisplayLevel: '0',
                LogModules: '*',
                SysReport: false,
                Target: '0',
            },
            Security: {
                ExposeSensitiveData: '',
                HaltLevel: '',
                ScanPolicy: '',
                Vault: 'Secure',
                AllowSetDefault: false,
                AuthRestart: false,
                BlacklistAppleUpdate: false,
                ApECID: '',
                DmgLoading: 'Signed',
                EnablePassword: false,
                PasswordHash: '',
                PasswordSalt: '',
                SecureBootModel: 'Default',
            },
            Entries: [],
            Tools: [],
            Serial: {
                Init: false,
                Override: false,
                Custom: {
                    BaudRate: 115200,
                    ClockRate: 1843200,
                    ExtendedTxFifoSize: 64,
                    FifoControl: 7,
                    LineControl: 7,
                    PciDeviceInfo: 'FF',
                    RegisterAccessWidth: 8,
                    RegisterBase: 1016,
                    RegisterStride: 1,
                    UseHardwareFlowControl: false,
                    UseMmio: false,
                },
            },
        },

        NVRAM: {
            root: { LegacyOverwrite: false, WriteFlash: false },
            AddLeft: [],
            AddRight: [],
            DeleteLeft: [],
            DeleteRight: [],
            LegacySchemaLeft: [],
            LegacySchemaRight: [],
        },

        PlatformInfo: {
            root: {
                Automatic: false,
                CustomMemory: false,
                UpdateDataHub: false,
                UpdateNVRAM: false,
                UpdateSMBIOS: false,
                UpdateSMBIOSMode: 'Create',
                UseRawUuidEncoding: false,
            },
            DataHub: {
                ARTFrequency: '',
                BoardProduct: '',
                BoardRevision: '',
                DevicePathsSupported: '',
                FSBFrequency: '',
                InitialTSC: '',
                PlatformName: '',
                SmcBranch: '',
                SmcPlatform: '',
                SmcRevision: '',
                StartupPowerEvents: '',
                SystemProductName: '',
                SystemSerialNumber: '',
                SystemUUID: '',
            },
            Generic: {
                AdviseFeatures: false,
                MLB: '',
                MaxBIOSVersion: false,
                ProcessorType: '',
                ROM: '',
                SpoofVendor: false,
                SystemMemoryStatus: 'Auto',
                SystemProductName: '',
                SystemSerialNumber: '',
                SystemUUID: '',
            },
            PlatformNVRAM: {
                BID: '',
                FirmwareFeatures: '',
                FirmwareFeaturesMask: '',
                MLB: '',
                ROM: '',
                SystemSerialNumber: '',
                SystemUUID: '',
            },
            Memory: {
                DataWidth: '',
                ErrorCorrection: '',
                FormFactor: '',
                MaxCapacity: '',
                TotalWidth: '',
                Type: '',
                TypeDetail: '',
            },
            Memory_Devices: [],
            SMBIOS: {
                BIOSReleaseDate: '',
                BIOSVendor: '',
                BIOSVersion: '',
                BoardAssetTag: '',
                BoardLocationInChassis: '',
                BoardManufacturer: '',
                BoardProduct: '',
                BoardSerialNumber: '',
                BoardType: '',
                BoardVersion: '',
                ChassisAssetTag: '',
                ChassisManufacturer: '',
                ChassisSerialNumber: '',
                ChassisType: '',
                ChassisVersion: '',
                FirmwareFeatures: '',
                FirmwareFeaturesMask: '',
                PlatformFeature: '',
                ProcessorType: '',
                SmcVersion: '',
                SystemFamily: '',
                SystemManufacturer: '',
                SystemProductName: '',
                SystemSKUNumber: '',
                SystemSerialNumber: '',
                SystemUUID: '',
                SystemVersion: '',
            },
        },

        UEFI: {
            root: { ConnectDrivers: false },
            Drivers: [],
            APFS: {
                EnableJumpstart: false,
                GlobalConnect: false,
                HideVerbose: false,
                JumpstartHotPlug: false,
                MinDate: 0,
                MinVersion: 0,
            },
            AppleInput: {
                AppleEvent: 'Auto',
                CustomDelays: false,
                GraphicsInputMirroring: false,
                KeyInitialDelay: 50,
                KeySubsequentDelay: 5,
                PointerPollMask: -1,
                PointerPollMax: 0,
                PointerPollMin: 0,
                PointerSpeedDiv: 1,
                PointerSpeedMul: 1,
            },
            Audio: {
                AudioCodec: 0,
                AudioDevice: '',
                AudioOutMask: -1,
                AudioSupport: false,
                DisconnectHda: false,
                MaximumGain: -15,
                MinimumAssistGain: -30,
                MinimumAudibleGain: -128,
                PlayChime: 'Auto',
                ResetTrafficClass: false,
                SetupDelay: 0,
            },
            Input: {
                KeyFiltering: false,
                KeyForgetThreshold: '',
                KeySupport: false,
                KeySupportMode: 'Auto',
                KeySwap: false,
                PointerSupport: false,
                PointerSupportMode: '',
                TimerResolution: '',
            },
            Output: {
                ClearScreenOnModeSwitch: false,
                ConsoleMode: '',
                DirectGopRendering: false,
                ForceResolution: false,
                GopPassThrough: 'Disabled',
                IgnoreTextInGraphics: false,
                ProvideConsoleGop: false,
                ReconnectGraphicsOnConnect: false,
                ReconnectOnResChange: false,
                ReplaceTabWithSpace: false,
                Resolution: '',
                SanitiseClearScreen: false,
                TextRenderer: 'BuiltinGraphics',
                UIScale: -1,
                UgaPassThrough: false,
            },
            ProtocolOverrides: {
                AppleAudio: false,
                AppleBootPolicy: false,
                AppleDebugLog: false,
                AppleEg2Info: false,
                AppleFramebufferInfo: false,
                AppleImageConversion: false,
                AppleImg4Verification: false,
                AppleKeyMap: false,
                AppleRtcRam: false,
                AppleSecureBoot: false,
                AppleSmcIo: false,
                AppleUserInterfaceTheme: false,
                DataHub: false,
                DeviceProperties: false,
                FirmwareVolume: false,
                HashServices: false,
                OSInfo: false,
                UnicodeCollation: false,
            },
            Quirks: {
                ActivateHpetSupport: false,
                DisableSecurityPolicy: false,
                EnableVectorAcceleration: false,
                EnableVmx: false,
                ExitBootServicesDelay: 0,
                ForceOcWriteFlash: false,
                ForgeUefiSupport: false,
                IgnoreInvalidFlexRatio: false,
                ReleaseUsbOwnership: false,
                ReloadOptionRoms: false,
                RequestBootVarRouting: false,
                ResizeGpuBars: -1,
                TscSyncTimeout: 0,
                UnblockFsConnect: false,
            },
            ReservedMemory: [],
        }
    }),
    getters: {
        getRoot() {
            return this.root
        }
    },
    actions: {
        setRoot(val) {
            this.root = val
        },

        updateAllSections(plistData) {
            if (!plistData) return

            this.configisMOD = plistData?.ACPI?.Quirks?.EnableForAll === undefined ? false : true

            this.sections.forEach((section) => {
                if (section === 'DeviceProperties') {
                    updateStoreForValue(this[section], plistData[section], 'Add')
                    updateStoreForVolume(this[section], plistData[section], 'Delete')
                } else if (section === 'NVRAM') {
                    updateStoreForValue(this[section], plistData[section], 'Add')
                    updateStoreForVolume(this[section], plistData[section], 'Delete')
                    updateStoreForVolume(this[section], plistData[section], 'LegacySchema')
                } else {
                    updateStoreForSimple(this[section], plistData[section])
                }

                //处理特殊被写入root的属性
                updateStoreForSpecial(this[section]['root'], plistData[section])

            })
        }




    },
})