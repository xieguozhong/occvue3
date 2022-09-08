import { fillLangString, htmlEscape, hextoBase64, showTipModal } from './comm'
export default class Generateplist {
    /**
     * @param {*} table table
     * @param {*} lang lang
     * @param {*} base base
     */
    constructor(table, lang, base) {
        this.table = table
        this.lang = lang
        this.base = base
    }

    getAllPlist() {
        let plistContext = '<?xml version="1.0" encoding="UTF-8"?>'
        plistContext += '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">'
        plistContext += '<plist version="1.0">'
        plistContext += '<dict>'

        //1 ACPI
        //console.log('getACPI')
        plistContext += this.getACPI()

        //2 Booter
        //console.log('getBooter')
        plistContext += this.getBooter()

        //3 DeviceProperties
        //console.log('getDeviceProperties')
        plistContext += this.getDeviceProperties()

        //4 Kernel
        //console.log('getKernel')
        plistContext += this.getKernel()

        //5 getMisc
        //console.log('getMisc')
        plistContext += this.getMisc()

        //6 NVRAM
        //console.log('getNVRAM')
        plistContext += this.getNVRAM()

        //7 PlatformInfo
        //console.log('getPlatformInfo')
        plistContext += this.getPlatformInfo()

        //8 UEFI
        //console.log('getUEFI')
        plistContext += this.getUEFI()

        plistContext += '</dict>'
        plistContext += '</plist>'

        plistContext = $.format(plistContext, { method: 'xml' })

        //格式特殊处理，只是为了美观
        plistContext = plistContext.replace('<dict/></dict>', '<dict/>\n        </dict>')

        localStorage.setItem('lastOpenCorePlistConfig', plistContext)

        return plistContext
    }

    getACPI() {
        let acpiContext = '<key>ACPI</key><dict>'
        //Add

        acpiContext += '<key>Add</key>'
        acpiContext += this.genArrayDict('ACPI_Add', this.base.ACPI.Add)
        //Delete

        acpiContext += '<key>Delete</key>'
        acpiContext += this.genArrayDict('ACPI_Delete', this.base.ACPI.Delete, ['OemTableId', 'TableSignature'], ['TableLength'])

        //Patch

        acpiContext += '<key>Patch</key>'
        acpiContext += this.genArrayDict(
            'ACPI_Patch',
            this.base.ACPI.Patch,
            ['Find', 'Mask', 'OemTableId', 'Replace', 'ReplaceMask', 'TableSignature'],
            ['BaseSkip', 'Count', 'Limit', 'Skip', 'TableLength']
        )

        //Quirks
        if (this.base.configisMOD === false) {
            acpiContext += '<key>Quirks</key>' + this.getBoolens(this.clone(this.base.ACPI.Quirks, ['EnableForAll']))
        } else {
            acpiContext += '<key>Quirks</key>' + this.getBoolens(this.base.ACPI.Quirks)
        }

        return acpiContext + '</dict>'
    }

    getBooter() {
        let BooterContext = '<key>Booter</key><dict>'

        //MmioWhitelist
        BooterContext += '<key>MmioWhitelist</key>'
        BooterContext += this.genArrayDict('Booter_MmioWhitelist', this.base.Booter.MmioWhitelist, [], ['Address'])

        //Patch
        BooterContext += '<key>Patch</key>'
        BooterContext += this.genArrayDict('Booter_Patch', this.base.Booter.Patch, ['Find', 'Mask', 'Replace', 'ReplaceMask'], ['Count', 'Limit', 'Skip'])

        //Quirks
        let thedt = { ProvideMaxSlide: 'integer', ResizeAppleGpuBars: 'integer' }
        if (this.base.configisMOD === false) {
            BooterContext +=
                '<key>Quirks</key><dict>' + this.getStringorboolorinterger(this.clone(this.base.Booter.Quirks, ['EnableForAll']), thedt) + '</dict>'
        } else {
            BooterContext += '<key>Quirks</key><dict>' + this.getStringorboolorinterger(this.base.Booter.Quirks, thedt) + '</dict>'
        }

        return BooterContext + '</dict>'
    }

    getDeviceProperties() {
        let DPContext = '<key>DeviceProperties</key><dict>'

        //Add
        DPContext += '<key>Add</key>'
        DPContext += this.getDeviceData(
            this.getRewriteLRData('DeviceProperties_AddLeft', this.base.DeviceProperties.AddLeft),
            this.getRewriteLRData('DeviceProperties_AddRight', this.base.DeviceProperties.AddRight)
        )

        //Delete
        DPContext += '<key>Delete</key>'
        DPContext += this.getDeviceVolumeData(
            this.getRewriteLRData('DeviceProperties_DeleteLeft', this.base.DeviceProperties.DeleteLeft),
            this.getRewriteLRData('DeviceProperties_DeleteRight', this.base.DeviceProperties.DeleteRight)
        )

        return DPContext + '</dict>'
    }

    getKernel() {
        let keContext = '<key>Kernel</key><dict>'

        //Add
        keContext += '<key>Add</key>'
        keContext += this.genArrayDict('Kernel_Add', this.base.Kernel.Add)

        //Block
        keContext += '<key>Block</key>'
        keContext += this.genArrayDict('Kernel_Block', this.base.Kernel.Block)

        //Emulate
        keContext += '<key>Emulate</key><dict>'

        keContext += '<key>Cpuid1Data</key>'
        keContext += '<data>' + hextoBase64(this.base.Kernel.Emulate['Cpuid1Data']) + '</data>'
        keContext += '<key>Cpuid1Mask</key>'
        keContext += '<data>' + hextoBase64(this.base.Kernel.Emulate['Cpuid1Mask']) + '</data>'
        keContext += '<key>DummyPowerManagement</key>'
        keContext += this.toBoolStringStrict(this.base.Kernel.Emulate['DummyPowerManagement'])
        keContext += '<key>MaxKernel</key>' + this.addCharstring(this.base.Kernel.Emulate['MaxKernel'])
        keContext += '<key>MinKernel</key>' + this.addCharstring(this.base.Kernel.Emulate['MinKernel'])
        keContext += '</dict>'

        //Force
        keContext += '<key>Force</key>'
        keContext += this.genArrayDict('Kernel_Force', this.base.Kernel.Force)

        //Patch
        keContext += '<key>Patch</key>'
        keContext += this.genArrayDict('Kernel_Patch', this.base.Kernel.Patch, ['Find', 'Mask', 'Replace', 'ReplaceMask'], ['Count', 'Limit', 'Skip'])

        //Quirks
        keContext += '<key>Quirks</key>'
        keContext += this.getBoolens(this.base.Kernel.Quirks, ['SetApfsTrimTimeout'])

        //Scheme
        keContext += '<key>Scheme</key><dict>'
        keContext += '<key>CustomKernel</key>'
        keContext += this.toBoolStringStrict(this.base.Kernel.Scheme['CustomKernel'])
        keContext += '<key>FuzzyMatch</key>'
        keContext += this.toBoolStringStrict(this.base.Kernel.Scheme['FuzzyMatch'])
        keContext += '<key>KernelArch</key>' + this.addCharstring(this.base.Kernel.Scheme['KernelArch'])
        keContext += '<key>KernelCache</key>' + this.addCharstring(this.base.Kernel.Scheme['KernelCache'])
        keContext += '</dict>'

        return keContext + '</dict>'
    }

    getMisc() {
        let miscContext = '<key>Misc</key><dict>'

        //1 BlessOverride
        miscContext += '<key>BlessOverride</key>'
        let bodata = this.base.Misc.BlessOverride,
            bostring = ''
        ////console.log('bodata type = ' + getTypeof(bodata))
        for (let i = 0, len = bodata.length; i < len; i++) {
            bostring += this.addCharstring(bodata[i]['ScanningPaths'])
        }
        miscContext += this.bothsidesAddarray(bostring)

        //2 Boot
        miscContext += '<key>Boot</key><dict>'
        miscContext += '<key>ConsoleAttributes</key><integer>' + this.toNumber(this.base.Misc.Boot['ConsoleAttributes']) + '</integer>'
        miscContext += '<key>HibernateMode</key>' + this.addCharstring(this.base.Misc.Boot['HibernateMode'])

        miscContext += '<key>HideAuxiliary</key>' + this.toBoolStringStrict(this.base.Misc.Boot['HideAuxiliary'])
        miscContext += '<key>LauncherOption</key>' + this.addCharstring(this.base.Misc.Boot['LauncherOption'])
        miscContext += '<key>LauncherPath</key>' + this.addCharstring(this.base.Misc.Boot['LauncherPath'])

        miscContext += '<key>PickerAttributes</key><integer>' + this.toNumber(this.base.Misc.Boot['PickerAttributes']) + '</integer>'
        miscContext += '<key>PickerAudioAssist</key>' + this.toBoolStringStrict(this.base.Misc.Boot['PickerAudioAssist'])
        miscContext += '<key>PickerMode</key>' + this.addCharstring(this.base.Misc.Boot['PickerMode'])
        miscContext += '<key>PickerVariant</key>' + this.addCharstring(this.base.Misc.Boot['PickerVariant'])
        miscContext += '<key>PollAppleHotKeys</key>' + this.toBoolStringStrict(this.base.Misc.Boot['PollAppleHotKeys'])

        miscContext += '<key>ShowPicker</key>' + this.toBoolStringStrict(this.base.Misc.Boot['ShowPicker'])
        if (this.base.configisMOD === true) {
            miscContext += '<key>SkipCustomEntryCheck</key>' + this.toBoolStringStrict(this.base.Misc.Boot['SkipCustomEntryCheck'])
        }
        miscContext += '<key>TakeoffDelay</key><integer>' + this.toNumber(this.base.Misc.Boot['TakeoffDelay']) + '</integer>'
        miscContext += '<key>Timeout</key><integer>' + this.toNumber(this.base.Misc.Boot['Timeout']) + '</integer>'

        //3 Debug
        miscContext += '</dict><key>Debug</key><dict>'
        miscContext += '<key>AppleDebug</key>' + this.toBoolStringStrict(this.base.Misc.Debug['AppleDebug'])
        miscContext += '<key>ApplePanic</key>' + this.toBoolStringStrict(this.base.Misc.Debug['ApplePanic'])
        miscContext += '<key>DisableWatchDog</key>' + this.toBoolStringStrict(this.base.Misc.Debug['DisableWatchDog'])
        miscContext += '<key>DisplayDelay</key><integer>' + this.toNumber(this.base.Misc.Debug['DisplayDelay']) + '</integer>'
        miscContext += '<key>DisplayLevel</key><integer>' + this.toNumber(this.base.Misc.Debug['DisplayLevel']) + '</integer>'
        miscContext += '<key>LogModules</key>' + this.addCharstring(this.base.Misc.Debug['LogModules'])
        miscContext += '<key>SysReport</key>' + this.toBoolStringStrict(this.base.Misc.Debug['SysReport'])
        miscContext += '<key>Target</key><integer>' + this.toNumber(this.base.Misc.Debug['Target']) + '</integer>'

        //4 Entries
        miscContext += '</dict><key>Entries</key>'
        miscContext += this.genArrayDict('Misc_Entries', this.base.Misc.Entries)

        //5 Security
        miscContext += '<key>Security</key><dict>'
        miscContext += '<key>AllowSetDefault</key>' + this.toBoolStringStrict(this.base.Misc.Security['AllowSetDefault'])
        miscContext += '<key>ApECID</key><integer>' + this.toNumber(this.base.Misc.Security['ApECID']) + '</integer>'
        miscContext += '<key>AuthRestart</key>' + this.toBoolStringStrict(this.base.Misc.Security['AuthRestart'])
        miscContext += '<key>BlacklistAppleUpdate</key>' + this.toBoolStringStrict(this.base.Misc.Security['BlacklistAppleUpdate'])
        miscContext += '<key>DmgLoading</key>' + this.addCharstring(this.base.Misc.Security['DmgLoading'])
        miscContext += '<key>EnablePassword</key>' + this.toBoolStringStrict(this.base.Misc.Security['EnablePassword'])
        miscContext += '<key>ExposeSensitiveData</key><integer>' + this.toNumber(this.base.Misc.Security['ExposeSensitiveData']) + '</integer>'
        miscContext += '<key>HaltLevel</key><integer>' + this.toNumber(this.base.Misc.Security['HaltLevel']) + '</integer>'
        miscContext += '<key>PasswordHash</key>'
        miscContext += '<data>' + hextoBase64(this.base.Misc.Security['PasswordHash']) + '</data>'
        miscContext += '<key>PasswordSalt</key>'
        miscContext += '<data>' + hextoBase64(this.base.Misc.Security['PasswordSalt']) + '</data>'
        miscContext += '<key>ScanPolicy</key><integer>' + this.toNumber(this.base.Misc.Security['ScanPolicy']) + '</integer>'
        miscContext += '<key>SecureBootModel</key>' + this.addCharstring(this.base.Misc.Security['SecureBootModel'])
        miscContext += '<key>Vault</key>' + this.addCharstring(this.base.Misc.Security['Vault'])

        //Serial
        miscContext += '</dict><key>Serial</key><dict>'
        miscContext += '<key>Init</key>' + this.toBoolStringStrict(this.base.Misc.Serial['Init'])
        miscContext += '<key>Override</key>' + this.toBoolStringStrict(this.base.Misc.Serial['Override'])

        //Serial.Custom
        if (this.base.Misc.Serial['Override'] === true) {
            miscContext += '<key>Custom</key><dict>'
            miscContext += '<key>BaudRate</key><integer>' + this.toNumber(this.base.Misc.Serial.Custom['BaudRate']) + '</integer>'
            miscContext += '<key>ClockRate</key><integer>' + this.toNumber(this.base.Misc.Serial.Custom['ClockRate']) + '</integer>'
            miscContext += '<key>ExtendedTxFifoSize</key><integer>' + this.toNumber(this.base.Misc.Serial.Custom['ExtendedTxFifoSize']) + '</integer>'
            miscContext += '<key>FifoControl</key><integer>' + this.toNumber(this.base.Misc.Serial.Custom['FifoControl']) + '</integer>'
            miscContext += '<key>LineControl</key><integer>' + this.toNumber(this.base.Misc.Serial.Custom['LineControl']) + '</integer>'
            miscContext += '<key>PciDeviceInfo</key><data>' + hextoBase64(this.base.Misc.Serial.Custom['PciDeviceInfo']) + '</data>'
            miscContext += '<key>RegisterAccessWidth</key><integer>' + this.toNumber(this.base.Misc.Serial.Custom['RegisterAccessWidth']) + '</integer>'
            miscContext += '<key>RegisterBase</key><integer>' + this.toNumber(this.base.Misc.Serial.Custom['RegisterBase']) + '</integer>'
            miscContext += '<key>RegisterStride</key><integer>' + this.toNumber(this.base.Misc.Serial.Custom['RegisterStride']) + '</integer>'
            miscContext += '<key>UseHardwareFlowControl</key>' + this.toBoolStringStrict(this.base.Misc.Serial.Custom['UseHardwareFlowControl'])
            miscContext += '<key>UseMmio</key>' + this.toBoolStringStrict(this.base.Misc.Serial.Custom['UseMmio'])
            miscContext += '</dict>'
        }

        //6 Tools
        miscContext += '</dict><key>Tools</key>'
        miscContext += this.genArrayDict('Misc_Tools', this.base.Misc.Tools)

        return miscContext + '</dict>'
    }

    getNVRAM() {
        let nvramContext = '<key>NVRAM</key><dict>'

        //1 Add
        nvramContext += '<key>Add</key>'
        nvramContext += this.getDeviceData(
            this.getRewriteLRData('NVRAM_AddLeft', this.base.NVRAM.AddLeft),
            this.getRewriteLRData('NVRAM_AddRight', this.base.NVRAM.AddRight)
        )

        //2 Delete
        nvramContext += '<key>Delete</key>'
        nvramContext += this.getDeviceVolumeData(
            this.getRewriteLRData('NVRAM_DeleteLeft', this.base.NVRAM.DeleteLeft),
            this.getRewriteLRData('NVRAM_DeleteRight', this.base.NVRAM.DeleteRight)
        )

        //3 LegacyOverwrite
        nvramContext += '<key>LegacyOverwrite</key>' + this.toBoolStringStrict(this.base.NVRAM.root['LegacyOverwrite'])

        //4 LegacySchema
        nvramContext += '<key>LegacySchema</key>'
        nvramContext += this.getDeviceVolumeData(
            this.getRewriteLRData('NVRAM_LegacySchemaLeft', this.base.NVRAM.LegacySchemaLeft),
            this.getRewriteLRData('NVRAM_LegacySchemaRight', this.base.NVRAM.LegacySchemaRight)
        )

        //5 WriteFlash
        nvramContext += '<key>WriteFlash</key>' + this.toBoolStringStrict(this.base.NVRAM.root['WriteFlash'])

        return nvramContext + '</dict>'
    }

    getPlatformInfo() {
        let pfiContext = '<key>PlatformInfo</key><dict>',
            configisfull = this.base.configisfull
        ////console.log(configisfull);

        //0 Automatic
        pfiContext += '<key>Automatic</key>' + this.toBoolStringStrict(this.base.PlatformInfo.root['Automatic'])
        pfiContext += '<key>CustomMemory</key>' + this.toBoolStringStrict(this.base.PlatformInfo.root['CustomMemory'])

        //1 Generic
        pfiContext += '<key>Generic</key><dict>'
        let gdatatype = { ROM: 'data', ProcessorType: 'integer' }
        pfiContext += this.getStringorboolorinterger(this.base.PlatformInfo.Generic, gdatatype)
        pfiContext += '</dict>'

        if (configisfull === true) {
            //DataHub
            pfiContext += '<key>DataHub</key><dict>'
            let thedt = {
                ARTFrequency: 'integer',
                BoardRevision: 'data',
                DevicePathsSupported: 'integer',
                FSBFrequency: 'integer',
                InitialTSC: 'integer',
                SmcBranch: 'data',
                SmcPlatform: 'data',
                SmcRevision: 'data',
                StartupPowerEvents: 'integer',
            }
            pfiContext += this.getStringorboolorinterger(this.base.PlatformInfo.DataHub, thedt)
            pfiContext += '</dict>'

            //Memory
            pfiContext += '<key>Memory</key><dict>'
            thedt = {
                DataWidth: 'integer',
                ErrorCorrection: 'integer',
                FormFactor: 'integer',
                MaxCapacity: 'integer',
                TotalWidth: 'integer',
                Type: 'integer',
                TypeDetail: 'integer',
            }
            pfiContext += this.getStringorboolorinterger(this.base.PlatformInfo.Memory, thedt)
            pfiContext += '<key>Devices</key>'
            pfiContext += this.genArrayDict('PlatformInfo_MemoryDevices', this.base.PlatformInfo.Memory_Devices, [], ['Size', 'Speed'])
            pfiContext += '</dict>'

            //PlatformNVRAM
            pfiContext += '<key>PlatformNVRAM</key><dict>'
            let pfndatatype = { FirmwareFeatures: 'data', FirmwareFeaturesMask: 'data', ROM: 'data' }
            pfiContext += this.getStringorboolorinterger(this.base.PlatformInfo.PlatformNVRAM, pfndatatype)
            pfiContext += '</dict>'

            //SMBIOS
            pfiContext += '<key>SMBIOS</key><dict>'
            let smbiosdatatype = {
                BoardType: 'integer',
                ChassisType: 'integer',
                FirmwareFeatures: 'data',
                FirmwareFeaturesMask: 'data',
                PlatformFeature: 'integer',
                ProcessorType: 'integer',
                SmcVersion: 'data',
            }
            pfiContext += this.getStringorboolorinterger(this.base.PlatformInfo.SMBIOS, smbiosdatatype)
            pfiContext += '</dict>'
        }

        //root
        pfiContext += '<key>UpdateDataHub</key>' + this.toBoolStringStrict(this.base.PlatformInfo.root['UpdateDataHub'])
        pfiContext += '<key>UpdateNVRAM</key>' + this.toBoolStringStrict(this.base.PlatformInfo.root['UpdateNVRAM'])
        pfiContext += '<key>UpdateSMBIOS</key>' + this.toBoolStringStrict(this.base.PlatformInfo.root['UpdateSMBIOS'])
        pfiContext += '<key>UpdateSMBIOSMode</key>' + this.addCharstring(this.base.PlatformInfo.root['UpdateSMBIOSMode'])
        pfiContext += '<key>UseRawUuidEncoding</key>' + this.toBoolStringStrict(this.base.PlatformInfo.root['UseRawUuidEncoding'])
        return pfiContext + '</dict>'
    }

    getUEFI() {
        let uefiContext = '<key>UEFI</key><dict>'

        //APFS
        uefiContext += '<key>APFS</key><dict>'
        let ApfsDataType = { MinDate: 'integer', MinVersion: 'integer' }
        uefiContext += this.getStringorboolorinterger(this.base.UEFI.APFS, ApfsDataType)
        uefiContext += '</dict>'

        //AppleInput
        uefiContext += '<key>AppleInput</key><dict>'
        let AppleInputDataType = {
            KeyInitialDelay: 'integer',
            KeySubsequentDelay: 'integer',
            PointerPollMask: 'integer',
            PointerPollMax: 'integer',
            PointerPollMin: 'integer',
            PointerSpeedDiv: 'integer',
            PointerSpeedMul: 'integer',
        }
        uefiContext += this.getStringorboolorinterger(this.base.UEFI.AppleInput, AppleInputDataType)
        uefiContext += '</dict>'

        // Audio
        uefiContext += '<key>Audio</key><dict>'
        let AudioDataType = {
            AudioCodec: 'integer',
            AudioOutMask: 'integer',
            MaximumGain: 'integer',
            MinimumAssistGain: 'integer',
            MinimumAudibleGain: 'integer',
            SetupDelay: 'integer',
        }
        ////console.log(this.base.UEFI.Audio);
        uefiContext += this.getStringorboolorinterger(this.base.UEFI.Audio, AudioDataType)
        uefiContext += '</dict>'

        // root
        uefiContext += '<key>ConnectDrivers</key>' + this.toBoolStringStrict(this.base.UEFI.root['ConnectDrivers'])

        // Drivers
        uefiContext += '<key>Drivers</key>'
        uefiContext += this.genArrayDict('UEFI_Drivers', this.base.UEFI.Drivers, [], [])

        // Input
        uefiContext += '<key>Input</key><dict>'
        let inputDataType = { KeyForgetThreshold: 'integer', TimerResolution: 'integer' }
        uefiContext += this.getStringorboolorinterger(this.base.UEFI.Input, inputDataType)
        uefiContext += '</dict>'

        // Output
        uefiContext += '<key>Output</key><dict>'
        let thedt = { UIScale: 'integer' }
        uefiContext += this.getStringorboolorinterger(this.base.UEFI.Output, thedt)
        uefiContext += '</dict>'

        // ProtocolOverrides
        uefiContext += '<key>ProtocolOverrides</key><dict>'
        uefiContext += this.getStringorboolorinterger(this.base.UEFI.ProtocolOverrides)
        uefiContext += '</dict>'

        // Quirks
        uefiContext += '<key>Quirks</key><dict>'
        let quirksDataType = { ExitBootServicesDelay: 'integer', ResizeGpuBars: 'integer', TscSyncTimeout: 'integer' }
        uefiContext += this.getStringorboolorinterger(this.base.UEFI.Quirks, quirksDataType)
        uefiContext += '</dict>'

        //ReservedMemory
        uefiContext += '<key>ReservedMemory</key>'
        uefiContext += this.genArrayDict('UEFI_ReservedMemory', this.base.UEFI.ReservedMemory, [], ['Address', 'Size'])

        return uefiContext + '</dict>'
    }

    //*****************公共函数区**********************

    getDeviceVolumeData(leftData, rightData) {
        let strreturn = '<dict>',
            lenleftData = leftData.length

        for (let it = 0; it < lenleftData; it++) {
            //console.log(leftData[it])
            if (leftData[it]['Devices'] === undefined) {
                //console.log('getDeviceVolumeData')
                showTipModal(this.lang.DeviceError, 'warning')
            }
            strreturn += this.addKey(leftData[it]['Devices'])
            strreturn += this.getSubDeviceVolumeData(leftData[it]['id'], rightData)
        }

        return strreturn === '<dict>' ? '<dict/>' : strreturn + '</dict>'
    }

    getSubDeviceVolumeData(pid, rightData) {
        let strreturn = '',
            lenrightData = rightData.length

        for (let it = 0; it < lenrightData; it++) {
            if (rightData[it]['pid'] == pid) {
                if (rightData[it].Volume === undefined) {
                    //console.log('getSubDeviceVolumeData')
                    showTipModal(this.lang.DeviceError, 'warning')
                }

                const rightDataType = rightData[it].Type
                switch (rightDataType) {
                    case 'data':
                        strreturn += '<data>' + hextoBase64(rightData[it].Volume) + '</data>'
                        break
                    case 'bool': //如果是bool, 转成<true/>或者 <false/>
                        strreturn += toBoolString(rightData[it].Volume)
                        break
                    case 'integer':
                        strreturn += '<integer>' + this.toNumber(rightData[it].Value) + '</integer>'
                        break
                    case 'real':
                        strreturn += '<real>' + this.toNumber(rightData[it].Value, parseFloat) + '</real>'
                        break
                    default: //如果是其他就直接用数据类型包裹值
                        strreturn += '<' + rightDataType + '>' + htmlEscape(rightData[it].Volume) + '</' + rightDataType + '>'
                }
            }
        }

        return strreturn === '' ? '<array/>' : '<array>' + strreturn + '</array>'
    }

    getStringorboolorinterger(theData, dataType = {}) {
        let strreturn = '',
            vueitDatatype = '',
            itDataType = ''

        for (let it in theData) {
            vueitDatatype = typeof theData[it]
            if (vueitDatatype == 'object') continue //如果碰到数组直接跳过

            strreturn += this.addKey(it)

            //如果数据类型是BOOLEAN
            if (vueitDatatype === 'boolean') {
                strreturn += theData[it] === true ? '<true/>' : '<false/>'
            } else {
                itDataType = dataType[it]
                switch (itDataType) {
                    case 'data':
                        strreturn += '<data>' + hextoBase64(theData[it]) + '</data>'
                        break
                    case undefined:
                        strreturn += this.addCharstring(theData[it])
                        break
                    case 'integer':
                        strreturn += '<integer>' + this.toNumber(theData[it]) + '</integer>'
                        break
                    case 'real':
                        strreturn += '<real>' + this.toNumber(theData[it], parseFloat) + '</real>'
                        break
                    default:
                        strreturn += '<' + itDataType + '>' + htmlEscape(theData[it]) + '</' + itDataType + '>'
                }
            }
        }

        return strreturn
    }

    getDeviceData(leftData, rightData) {
        let strreturn = '<dict>',
            lenleftData = leftData.length

        for (let it = 0; it < lenleftData; it++) {
            if (leftData[it]['Devices'] === undefined) {
                //console.log('getDeviceData')
                showTipModal(this.lang.DeviceError, 'warning')
            }

            strreturn += this.addKey(leftData[it]['Devices'])
            strreturn += this.getSubDeviceData(leftData[it]['id'], rightData)
        }

        return strreturn === '<dict>' ? '<dict/>' : strreturn + '</dict>'
    }

    getSubDeviceData(pid, rightData) {
        let subcontext = '<dict>',
            rightDataType = '',
            lenrightData = rightData.length

        for (let i = 0; i < lenrightData; i++) {
            if (rightData[i].pid == pid) {
                if (rightData[i].Value === undefined) {
                    //console.log('getSubDeviceData')
                    showTipModal(this.lang.DeviceError, 'warning')
                }

                subcontext += this.addKey(rightData[i].Key)

                rightDataType = rightData[i].Type

                switch (rightDataType) {
                    case 'data':
                        subcontext += '<data>' + hextoBase64(rightData[i].Value) + '</data>'
                        break
                    case 'bool':
                        subcontext += toBoolString(rightData[i].Value)
                        break
                    case 'integer':
                        subcontext += '<integer>' + this.toNumber(rightData[i].Value) + '</integer>'
                        break
                    case 'real':
                        subcontext += '<real>' + this.toNumber(rightData[i].Value, parseFloat) + '</real>'
                        break
                    default:
                        subcontext += '<' + rightDataType + '>' + htmlEscape(rightData[i].Value) + '</' + rightDataType + '>'
                }
            }
        }

        return subcontext + '</dict>'
    }

    getBoolens(boolData, intData = []) {
        let strreturn = '<dict>'

        for (let it in boolData) {
            strreturn += this.addKey(it)
            if (intData.indexOf(it) >= 0) {
                strreturn += '<integer>' + this.toNumber(boolData[it]) + '</integer>'
            } else {
                strreturn += this.toBoolStringStrict(boolData[it])
            }
        }

        return strreturn === '<dict>' ? '<dict/>' : strreturn + '</dict>'
    }

    /**
    <array>
    <dict>
        <key>Comment</key>
        <string>My custom DSDT</string>
        <key>Enabled</key>
        <false/>
        <key>Path</key>
        <string>DSDT.aml</string>
    </dict>
    <dict>
        <key>Comment</key>
        <string>My custom SSDT</string>
        <key>Enabled</key>
        <false/>
        <key>Path</key>
        <string>SSDT-1.aml</string>
    </dict>
    根据tablekey去表格中读取数据并组装成字符串返回
    this.genArrayDict(		tablekey，      表格在GLOBAL_MAP_TABLE中的key
                        arrayDictData,  数据
                        dataFileds,     要转换为base64的字段列表
                        intFileds       要转换为整形的字段列表
                        )
    **/
    genArrayDict(tablekey, arrayDictData, dataFileds = [], intFileds = []) {
        if (arrayDictData.length === 0) {
            return '<array/>'
        }

        let currentTableData = this.table.getTable(tablekey).jqGrid('getRowData')
        arrayDictData = this.rewriteData(currentTableData, arrayDictData)

        let tmpreturn = '',
            lenarrayDictData = arrayDictData.length

        for (let i = 0; i < lenarrayDictData; i++) {
            tmpreturn += '<dict>'

            for (let it in arrayDictData[0]) {
                //字段顺序跟着第一行数据的字段顺序走，防止后增加的行的字段顺序和前面的不同
                if (it === 'id' || it === 'pid') {
                    continue
                }
                let itemData = arrayDictData[i][it] === undefined ? '' : arrayDictData[i][it]

                tmpreturn += this.addKey(it)

                // 如果当前字段在dataFileds中，说明要转为BASE64
                if (dataFileds.indexOf(it) >= 0) {
                    if (itemData === '') {
                        tmpreturn += '<data></data>'
                    } else {
                        tmpreturn += '<data>' + hextoBase64(itemData) + '</data>'
                    }
                }
                // 如果在整形字段列表中
                else if (intFileds.indexOf(it) >= 0) {
                    tmpreturn += '<integer>' + this.toNumber(itemData) + '</integer>'
                }
                //否则就是其他string boolean了
                else {
                    tmpreturn += this.addvtype(itemData)
                }
            }
            tmpreturn += '</dict>'
        }
        return '<array>' + tmpreturn + '</array>'
    }

    /*
     * 在key两边加上<key>字符串
     */
    addKey(keyContext) {
        return '<key>' + htmlEscape(keyContext) + '</key>'
    }

    /*
     * 在字符串两边加上<array>
     */
    bothsidesAddarray(context = '') {
        return context === '' ? '<array/>' : '<array>' + context + '</array>'
    }

    addvtype(valu) {
        //复选框被勾选后会变成YES, NO
        if (valu === 'YES') {
            return '<true/>'
        } else if (valu === 'NO') {
            return '<false/>'
        }

        const tf = typeof valu

        if (tf === 'string') {
            return this.addCharstring(valu)
        } else if (tf === 'boolean') {
            return this.toBoolStringStrict(valu)
        }
    }

    //用左边的数据重写右边的数据并返回右边的数据，目的是打开的文件是什么顺序，保存后的文件还是按照哪个顺序
    rewriteData(leftdata, rightdata) {

        const lenLeft = leftdata.length

        //先看表格有没有数据
        if (lenLeft === 0) {
            return []
        }

        //如果读入的文件没有数据，直接返回表格中的数据
        if (rightdata.length === 0) {
            return leftdata
        }

        //如果读入的配置文件有数据, 就按读入的数据顺序返回
        let attributeOrderJqgrid = Object.keys(leftdata[0]);//读取表格中的字段列表, 这个列表是匹配新版opencore的

        let attributeOrderVue = Object.keys(rightdata[0]);//这个是读入配置文件中的列表， 如果是老版本可能会有缺失一个字段

        attributeOrderVue = attributeOrderVue.filter((item) => {  //删除掉已经不存在的字段属性
            return attributeOrderJqgrid.includes(item)
        })

        attributeOrderJqgrid = attributeOrderJqgrid.filter((item) => { //找到新增加的字段属性
            return !attributeOrderVue.includes(item)
        })

        attributeOrderVue = [...attributeOrderVue, ...attributeOrderJqgrid] //组成新的字段属性列表，已经去旧革新

        const newRightdata = []

        const LenAttOrd = attributeOrderVue.length
        for (let i = 0; i < lenLeft; i++) {
            const tmpobj = {}
            for (let j = 0; j < LenAttOrd; j++) {
                tmpobj[attributeOrderVue[j]] = leftdata[i][attributeOrderVue[j]]
            }
            newRightdata.push(tmpobj)
        }

        return newRightdata
    }

    //用在左右两边表格的地方
    getRewriteLRData(tablekey, rightdata) {
        let currentTableData = this.table.getTable(tablekey).jqGrid('getRowData')
        return this.rewriteData(currentTableData, rightdata)
    }

    /**
     * 浅拷贝一个对象,delList中是不要的属性
     * @param {Object} target  要拷贝的对象
     * @param {Array} delList 不需要拷贝的属性列表
     * @returns
     */
    clone(target, delList = []) {
        const tempObj = {}
        for (const key in target) {
            if (delList.includes(key) === false && Reflect.has(target, key)) {
                tempObj[key] = target[key]
            }
        }
        return tempObj
    }

    /**
     * 1 检测num变量是否为数值
     * 2 如果不是弹出提示信息,返回0
     * 3 如果是根据第二个参数转换后返回, 默认为parseInt函数
     * @param {String} num
     * @param {Function} fnparse
     * @returns Number
     */
    toNumber(num, fnparse = parseInt) {
        if (isNaN(num)) {
            showTipModal(fillLangString(this.lang.toNumberError, num), 'warning')
            return 0
        }
        return fnparse(num)
    }

    /**
     * 输入 true 转为 '<true/>' ,其他的一律转为 '<false/>'
     * @param {string} strbool
     * @returns string
     */
    toBoolStringStrict(strbool) {
        if (strbool === true) {
            return '<true/>'
        } else {
            return '<false/>'
        }
    }

    /**
     * 在字符串两边加上<string>, 而且字符串中的 < > & 这3个符号会被转义
     * @param {String} context
     * @returns String
     */
    addCharstring(context = '') {
        return '<string>' + htmlEscape(context) + '</string>'
    }
}
