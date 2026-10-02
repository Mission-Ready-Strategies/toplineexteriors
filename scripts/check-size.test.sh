#!/usr/bin/env bash
set -euo pipefail
checker="$(cd "$(dirname "$0")" && pwd)/check-size.sh"
fixture=$(mktemp -d)
trap 'rm -rf "$fixture"' EXIT
git init -q "$fixture"
mkdir -p "$fixture/scripts" "$fixture/assets/css" "$fixture/src"
cp "$checker" "$fixture/scripts/check-size.sh"
: > "$fixture/scripts/size-baseline.txt"
cd "$fixture"
source_lines() { awk -v count="$2" 'BEGIN { for (i = 0; i < count; i++) print "source" }' > "$1"; }
passes() { bash scripts/check-size.sh > result.log 2>&1 || { cat result.log; exit 1; }; }
fails_with() {
  if bash scripts/check-size.sh > result.log 2>&1; then
    echo 'Expected the size check to reject this fixture.' >&2; exit 1
  fi
  grep -Fq "$1" result.log || { cat result.log; exit 1; }
}

source_lines 'src/page with spaces.html' 750
printf 'unterminated final line' >> 'src/page with spaces.html'
source_lines src/example.test.sh 1000
source_lines assets/css/site.css 1500
passes
source_lines 'src/page with spaces.html' 751
fails_with 'exceeds 750'
rm 'src/page with spaces.html'
source_lines src/example.test.sh 1001
fails_with 'exceeds 1000'
rm src/example.test.sh

printf 'src/ignored.js\n' > .gitignore
source_lines src/ignored.js 751
fails_with 'src/ignored.js'
rm src/ignored.js
source_lines scripts/size-baseline.txt 1
fails_with 'cannot acquire new allowances'
rm scripts/size-baseline.txt
fails_with 'must exist'
: > scripts/size-baseline.txt
ln -s ../scripts/check-size.sh src/link.sh
fails_with 'not a symlink'
rm src/link.sh
passes
echo 'Size guard behavior checks passed.'
