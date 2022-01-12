function RouteSetter() {
    const _this = RouteSetter.prototype;

    RouteSetter.COLOR_MAPPING_RED = 0;
    RouteSetter.COLOR_MAPPING_GREEN = 1;
    RouteSetter.COLOR_MAPPING_BLUE = 2;

    _this["Ready"] = function(pOriginCanvas, pMarkerCanvas, pBtnHands) {
        this.m_pBtnHands = pBtnHands;
        this.m_nMarkerCnt = 0;
        this.m_nMarkerSize = 0;
        this.m_pOriginCanvas = pOriginCanvas;
        this.m_pMarkerCanvas = pMarkerCanvas;

        this.m_bTwoStarting = false;
        this.m_pFirstImage = new Image();

        this.m_pCanvasHistory = [];
    };

    _this.resetFlags = function() {
        this.m_nMarkerCnt = 0;
        this.m_pCanvasHistory = [];
        this.setNumberOfStart();
    };

    _this["Undo"] = function() {
        const prevImageData = this.m_pCanvasHistory.pop();

        if (prevImageData) {
            const pMarkerCtx = this.m_pMarkerCanvas.getContext('2d');
            pMarkerCtx.clearRect(0, 0, this.m_pMarkerCanvas.width, this.m_pMarkerCanvas.height);
            pMarkerCtx.drawImage(prevImageData, 0, 0);
        }

        if (this.m_bTwoStarting && this.m_pCanvasHistory.length == 1) {
            this.m_nMarkerCnt = 1;
        } else if (this.m_pCanvasHistory.length == 0) {
            this.m_nMarkerCnt = 0;
        }
    };

    _this["RestoreImage"] = function() {
        const pOriginCtx = this.m_pOriginCanvas.getContext('2d');
        pOriginCtx.drawImage(this.m_pFirstImage, 0, 0);

        const pMarkerCtx = this.m_pMarkerCanvas.getContext('2d');
        pMarkerCtx.clearRect(0, 0, this.m_pMarkerCanvas.width, this.m_pMarkerCanvas.height);

        this.resetFlags();
    };

    _this["SelectFile"] = function(pDefautDiv, pSetterDiv) {
        const pFile = document.createElement("input");
        $(pFile).attr("type", "file");
        $(pFile).attr("accept", "image/*");
        $(pFile).attr("capture", "camera");
        $(pFile)["css"]("display", "none");
        const oThis = this;
        $(pFile).on("change", function() {
            $(pDefautDiv)["css"]("display", "none");
            $(pSetterDiv)["css"]("display", "block");
            oThis["SetImage"](URL.createObjectURL(this.files[0]));
            $(pFile)["remove"]();
        });
        $(document.body).append(pFile);
        $(pFile).click();
    };

    _this["SetImage"] = function(src) {
        const selectedImg = new Image();
        selectedImg.src = src;
        $(selectedImg)["css"]("display", "none");
        const oThis = this;
        $(selectedImg).on("load", function() {
            const windowWidth = (window.innerWidth * 0.90);
            let nRatio = 1;
            if (selectedImg.width > windowWidth) {
                nRatio = selectedImg.width / windowWidth;
            } else {
                nRatio = windowWidth / selectedImg.width;
            }

            selectedImg.width /= nRatio;
            selectedImg.height /= nRatio;

            try {
                const pWrapperDiv = $(oThis.m_pOriginCanvas).parent();
                $(pWrapperDiv).css("width", selectedImg.width);
                $(pWrapperDiv).css("height", selectedImg.height);

                oThis.m_pOriginCanvas.width = selectedImg.width;
                oThis.m_pOriginCanvas.height = selectedImg.height;

                oThis.m_pMarkerCanvas.width = selectedImg.width;
                oThis.m_pMarkerCanvas.height = selectedImg.height;

                const pCtx = oThis.m_pOriginCanvas.getContext("2d");
                pCtx.drawImage(selectedImg, 0, 0, selectedImg.width, selectedImg.height);
                oThis.m_pFirstImage.src = oThis.m_pOriginCanvas.toDataURL("image/png");
                const rect = oThis.m_pOriginCanvas.getBoundingClientRect();
                oThis.m_nMarkerSize = (rect.width > rect.height) ? rect.width*0.04 : rect.height*0.04;
                setTimeout(() => {
                    oThis.resetFlags();
                }, 0);
            } catch (e) {
                console.log(e);
            } finally {
                $(selectedImg)["remove"]();
            }
        });
        $(document.body).append(selectedImg);
    };

    _this.setNumberOfStart = function() {
        this.m_bTwoStarting = window["confirm"]('Two Starting Holds? ✋✋');
    };
    
    _this["AddEvents"] = function() {
        $(this.m_pMarkerCanvas).on("click", (e) => { this.OnClick(e); });
        $(this.m_pMarkerCanvas).on("dblclick", (e) => { this.OnDblClick(e); });
    };

    _this["DownloadImage"] = function(pLinkNode) {
        const pExportCanvas = document.createElement('canvas');
        pExportCanvas.width = this.m_pOriginCanvas.width;
        pExportCanvas.height = this.m_pOriginCanvas.height;

        const pCtx = pExportCanvas.getContext('2d');
        pCtx.drawImage(this.m_pOriginCanvas, 0, 0, pExportCanvas.width, pExportCanvas.height);
        pCtx.drawImage(this.m_pMarkerCanvas, 0, 0, pExportCanvas.width, pExportCanvas.height);

        const data = pExportCanvas.toDataURL('image/png');
        pLinkNode.href = data.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
        pLinkNode.click();
    };

    _this.OnClick = function(event) {
        if (event.detail == 2) return; // prevent double click event
        
        const pBackupImage = new Image();
        pBackupImage.src = this.m_pMarkerCanvas.toDataURL('image/png');
        this.m_pCanvasHistory.push(pBackupImage);
        
        const pMarkerCtx = this.m_pMarkerCanvas.getContext('2d');
        const rect = this.m_pMarkerCanvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const markerSize = (rect.width > rect.height) ? rect.width*0.06 : rect.height*0.06;
        const radius = markerSize * 0.4;
        const endAngle = 2*Math.PI;

        pMarkerCtx.beginPath();
        pMarkerCtx.arc(x, y, radius, 0, endAngle, false);
        pMarkerCtx.lineWidth = markerSize * 0.15;
        pMarkerCtx.strokeStyle = "white";
        pMarkerCtx.stroke();

        if (this.m_nMarkerCnt == 0
            || (this.m_nMarkerCnt == 1 && this.m_bTwoStarting)) {
            pMarkerCtx.strokeStyle = "red";
        } else {
            pMarkerCtx.strokeStyle = "springgreen";
        }

        pMarkerCtx.arc(x, y, radius, 0, endAngle, false);
        pMarkerCtx.lineWidth = markerSize * 0.1;
        this.m_nMarkerCnt++;
        pMarkerCtx.stroke();
    };

    _this.OnDblClick = function(event) {
        this["Undo"]();

        const pBackupImage = new Image();
        pBackupImage.src = this.m_pMarkerCanvas.toDataURL('image/png');
        this.m_pCanvasHistory.push(pBackupImage);
        
        const pMarkerCtx = this.m_pMarkerCanvas.getContext('2d');
        const rect = this.m_pMarkerCanvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const markerSize = (rect.width > rect.height) ? rect.width*0.06 : rect.height*0.06;
        const radius = markerSize * 0.4;
        const endAngle = 2*Math.PI;

        pMarkerCtx.beginPath();
        pMarkerCtx.arc(x, y, radius, 0, endAngle, false);
        pMarkerCtx.lineWidth = markerSize * 0.15;
        pMarkerCtx.strokeStyle = "white";
        pMarkerCtx.stroke();

        pMarkerCtx.arc(x, y, radius, 0, endAngle, false);
        pMarkerCtx.lineWidth = markerSize * 0.1;
        pMarkerCtx.strokeStyle = "rgb(0, 85, 255)";
        pMarkerCtx.stroke();
    };
};
