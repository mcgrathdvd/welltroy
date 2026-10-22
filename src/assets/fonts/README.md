# Website fonts

Unmodified Latin WOFF2 subsets from Fontsource 5.3.0. Families are registered under the existing website CSS names. Inter and Archivo retain variable weights; IBM Plex Mono uses weight 500. Georgia headings and system fallbacks are unchanged.

Only Inter is preloaded. All font faces use font-display: swap. Vite emits content-hashed files in /_astro/ so the existing immutable cache policy applies. Characters outside these subsets continue through the existing system fallback stack.

Source and integrity records:

```json
[
  {
    "package": "@fontsource-variable/inter",
    "version": "5.3.0",
    "license": "OFL-1.1",
    "file": "inter-latin-wght-normal.woff2",
    "bytes": 48256,
    "sha256": "3100e775e8616cd2611beecfa23a4263d7037586789b43f035236a2e6fbd4c62",
    "package_integrity": "sha512-OupL48va4JNofb97w6NYeF9S7W/kHNKM0Er8Dem5nqi4jeOLrVJDoE8tZEpnMJmtkvNbB1EIPPwHcdkF6b1oUA==",
    "tarball": "https://registry.npmjs.org/@fontsource-variable/inter/-/inter-5.3.0.tgz"
  },
  {
    "package": "@fontsource-variable/archivo",
    "version": "5.3.0",
    "license": "OFL-1.1",
    "file": "archivo-latin-wght-normal.woff2",
    "bytes": 34928,
    "sha256": "8f704806dbedeaaeca334b11ec348bc3ac3a439d6431544b3afb54f534ee4967",
    "package_integrity": "sha512-HogK8FJelrD1o7TlZlkIVtHgc20bO5PZRWE7mUeUTdMN055alznQV6/00J00IBeu8FQAH4s3zW9UJNvKExXf+g==",
    "tarball": "https://registry.npmjs.org/@fontsource-variable/archivo/-/archivo-5.3.0.tgz"
  },
  {
    "package": "@fontsource/ibm-plex-mono",
    "version": "5.3.0",
    "license": "OFL-1.1",
    "file": "ibm-plex-mono-latin-500-normal.woff2",
    "bytes": 14888,
    "sha256": "01d285447409c8a588692162439a038b8cbd7871309ee20267b0d2d91c6e8e22",
    "package_integrity": "sha512-eTgnZjZEGk1QtD3ZstF+Vclo2HLAni8YMy34/DxllwZvyz1lR/1RF/xTiAquOBO7MvqBx8D2Ig2WCPMVfdZu7Q==",
    "tarball": "https://registry.npmjs.org/@fontsource/ibm-plex-mono/-/ibm-plex-mono-5.3.0.tgz"
  }
]
```

Original copyright and OFL terms are preserved in inter-OFL.txt, archivo-OFL.txt and mono-OFL.txt. No package scripts were run and no runtime dependency was added.
