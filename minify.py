#!/usr/bin/env python

import os
from subprocess import call

def clean():
    pass

def minify(paths):
    command = "/var/www/chunliang.me/maintenance/minify/min_extras/cli/minify.php"
    for path in paths:
        minpath = path[:path.rfind('.')] + '.min' + path[path.rfind('.'):]
        call(' '.join([command, '-o ' + minpath, path]), shell=True)

if __name__ == '__main__':
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
