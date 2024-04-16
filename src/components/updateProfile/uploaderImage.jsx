import React from 'react'

export default function UploaderImage() {
  return (
    <>
    <div className="border rounded-lg h-full pt-5 relative">
              {/* <UploadAvatar /> */}

              {/* <input
                className="border rounded-full w-36 h-36 absolute top-5 left-0 translate-x-1/2 opacity-0 cursor-pointer"
                type="file"
                onChange={(e) => {
                  setFileimg(e.target.files[0].name);
                  console.log(fileimg);
                }}
              /> */}
              <div>
                {/* <RHFUploadAvatar
                name="avatarUrl"
                accept="image/*"
                maxSize={3145728}
                
                
              /> */}

                {/* <RHFUploadAvatar
                  name="avatarUrl"
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary',
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                /> */}
              </div>
              <p className="text-xs mt-2">Allowed *.jpeg, *.jpg, *.png, *.gif</p>
              <p className="text-xs mt-2"> max size of 3.1 MB</p>
            </div>
    </>
  )
}
