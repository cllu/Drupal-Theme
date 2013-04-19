#!/usr/bin/env python

import os
import shutil
from subprocess import call

command = "/var/www/chunliang.me/maintenance/minify/min_extras/cli/minify.php"
assets_dir = '/var/www/chunliang.me/drupal/assets/'

def clean():
    pass

def minify(paths):
    for path in paths:
        minpath = path[:path.rfind('.')] + '.min' + path[path.rfind('.'):]
        call(' '.join([command, '-o ' + minpath, path]), shell=True)

def minify_all():
    paths = []
    dirs = ['js', 'css']
    for dir in dirs:
        for f in os.listdir(dir):
            # ignore the minified files
            if '.min.' in f:
                continue
            paths.append(os.path.join(dir, f))

    print "minifying %d files" % len(paths)
    minify(paths)
    print "done."

def minify_user():
    css_paths = ' '.join(['css/normalize.css', 'css/print.css', 'css/style.css'])
    call(' '.join([command, '-o ' + 'packed.css', css_paths]), shell=True)

    #js_paths = ' '.join(['js/jquery.hotkeys.js', 'js/Markdown.Converter.js', 'js/Markdown.Extra.js', 'js/script.js'])
    js_paths = ' '.join(['js/script.js'])
    call(' '.join([command, '-o ' + 'packed.js', js_paths]), shell=True)

    shutil.copy('packed.css', assets_dir)
    shutil.copy('packed.js', assets_dir)
    shutil.copy('favicon.ico', assets_dir)

if __name__ == '__main__':
    minify_user()
