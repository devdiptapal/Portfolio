#!/bin/bash
# Refresh the Substack feed snapshot that writing.html reads.
# Run after publishing a post, then commit and push substack-feed.xml.
set -e
cd "$(dirname "$0")"
curl -sfL https://dpal.substack.com/feed -o feed.tmp
grep -q '<item>' feed.tmp || { echo "No posts in feed; keeping old snapshot"; rm feed.tmp; exit 1; }
sed -E 's#<lastBuildDate>[^<]*</lastBuildDate>##' feed.tmp > substack-feed.xml
rm feed.tmp
echo "Updated substack-feed.xml with $(grep -o '<item>' substack-feed.xml | wc -l | tr -d ' ') posts"
