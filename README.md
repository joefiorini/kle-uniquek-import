# kle-uniquek-import

This is a CLI tool for POSIX-compatible clients that takes a layout from <http://keyboard-layout-editor.com> and uploads it to your keyboard that is running the [animus][1] firmware (currently only known to work with the Diverge II).

## Usage

This assumes you are familiar with creating layouts on <http://keyboard-layout-editor.com> (henceforth referred to as KLE).

### Parsing your layout

#### Finding the gist id

Open your desired layout in KLE. The gist id can be found in the browser's address bar following "/gists/". In the following example, the gist id is highlighted:



#### Options

### Uploading to your keyboard

#### Finding the device descriptor

#### Options

### Putting it all together

## TODO

- [ ] Simple workflow to transpile before publishing
- [ ] Create separate package for serial uploader and publish on npm
- [ ] Publish main module to npm
- [ ] Separate hardware-specific layout logic into modules
