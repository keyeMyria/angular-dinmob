

  function uploadPreviewLink(scope, element, attrs) {
    var imgOrientation = 1;

    if (!supportHelper.support) return;

    console.log('ATTRS :: ', attrs);

    var params = scope.$eval(attrs.uploadPreview);

    if (!supportHelper.isFile(params.file)) return;
    if (!supportHelper.isImage(params.file)) return;

    getOrientation(params.file, function(orientation) {
      console.log('ORIENTATION :: ', orientation);
      imgOrientation = orientation;
    });

    var canvas = element.find('canvas');
    var reader = new FileReader();

    reader.onload = onLoadFile;
    reader.readAsDataURL(params.file);

    function onLoadFile(e) {
      var img = new Image();

      img.onload = onLoadImage;
      img.src = e.target.result;
    }

    function onLoadImage() {
      var height = this.height,
        width = this.width,
        ctx = canvas[0].getContext('2d');

      if (imgOrientation > 4) {
        // these are rotated, swap width and height and calculate aspect ratio
        width = height;
        height = (width / this.width) * this.height;

        canvas.attr({
          width: height,
          height: width
        });
      } else {
        // these aren't rotated, so width and height remain normal
        canvas.attr({
          width: width,
          height: height
        });
      }

      switch (imgOrientation) {
        case 1:
          // normal
          ctx.drawImage(this, 0, 0, width, height);
          break;
        case 2:
          // flip horizontal
          ctx.translate(width, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(this, 0, 0, width, height);
          break;
        case 3:
          // rotate 180
          ctx.translate(width, height);
          ctx.rotate(Math.PI);
          ctx.drawImage(this, 0, 0, width, height);
          break;
        case 4:
          // flip vertical
          ctx.translate(0, height);
          ctx.scale(1, -1);
          ctx.drawImage(this, 0, 0, width, height);
          break;
        case 5:
          // flip vertical, rotate 90 clockwise
          ctx.rotate(Math.PI / 2);
          ctx.scale(1, -1);
          ctx.drawImage(this, 0, 0, width, height);
          break;
        case 6:
          // rotate 90 clockwise
          ctx.rotate(Math.PI / 2);
          ctx.translate(0, -height);
          ctx.drawImage(this, 0, 0, width, height);
          break;
        case 7:
          // flip horizontal, rotate 90 counter clockwise
          ctx.rotate(Math.PI / 2);
          ctx.translate(width, -height);
          ctx.scale(-1, 1);
          ctx.drawImage(this, 0, 0, width, height);
          break;
        case 8:
          // rotate 90 counter clockwise
          ctx.rotate(-Math.PI / 2);
          ctx.translate(-width, 0);
          ctx.drawImage(this, 0, 0, width, height);
          break;
        default:
          // normal
          ctx.drawImage(this, 0, 0, width, height);
          return;
      }

    }
  }



  //
  // img orientation - borrowed and adapted from people who are way smarter than I 
  // https://github.com/blueimp/JavaScript-Load-Image/blob/master/js/load-image-meta.js
  // 
  function getOrientation(file, callback) {
    
    var reader = new FileReader();

    reader.onload = function(e) {
      var view = new DataView(e.target.result);

      // check for jpeg marker '0xffd8', return if not img
      if (view.getUint16(0, false) != 0xFFD8) return callback(-2);

      var length = view.byteLength,
        offset = 2;

      while (offset < length) {
        var marker = view.getUint16(offset, false);
        offset += 2;

        // check for EXIF marker '0xFFE1'
        if (marker == 0xFFE1) {
          if (view.getUint32(offset += 2, false) != 0x45786966) return callback(-1);
          var little = view.getUint16(offset += 6, false) == 0x4949;
          offset += view.getUint32(offset + 4, little);
          var tags = view.getUint16(offset, little);
          offset += 2;
          for (var i = 0; i < tags; i++)
            if (view.getUint16(offset + (i * 12), little) == 0x0112)
              return callback(view.getUint16(offset + (i * 12) + 8, little));
        } else if ((marker & 0xFF00) != 0xFF00) break;
        else offset += view.getUint16(offset, false);
      }
      return callback(-1);
    };
   
    reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
  }


