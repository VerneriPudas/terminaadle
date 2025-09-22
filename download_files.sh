#!/bin/bash

# usage: ./download_files.sh <URL> [destination]

URL="$1"
DEST_DIR="${2:-pdf_downloads}"

if [ -z "$URL" ]; then
  echo "Usage: $0 <URL> [destination]"
  exit 1
fi

mkdir -p "$DEST_DIR"
TMPFILE=$(mktemp)

wget -q -O "$TMPFILE" "$URL"

grep -oP '(?<=href=")[^"]+\.pdf' "$TMPFILE" | while read -r LINK; do
  wget --base="$URL" -P "$DEST_DIR" "$LINK"
done

rm "$TMPFILE"

