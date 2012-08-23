{-# LANGUAGE OverloadedStrings, Arrows #-}
module Main where

import Control.Monad (forM_)
import Control.Arrow (arr, (>>>))
import Data.Monoid (mempty, mconcat)

import Hakyll

main :: IO ()
main = hakyll $ do
    -- Move content
    match "content/**" $ do
        route   idRoute
        compile copyFileCompiler

    -- Compress CSS
    match "css/*" $ do
        route   idRoute
        compile compressCssCompiler

    -- Render normal static pages
    forM_ ["contact.markdown", "bio.markdown", "resume/index.markdown"] $ \p ->
        match p $ do
            route   $ setExtension ".html"
            compile $ pageCompiler
                >>> withHeaderAndFooter
                >>> wrapContent
                >>> finish
                >>> relativizeUrlsCompiler

    -- Render home page
    match "index.html" $ route $ idRoute
    create "index.html" $ constA mempty 
        >>> arr (setField "title" "Home")
        >>> requireAllA (regex "projects/(nextris|chromathud|cheezus)/index.markdown") addProj
        >>> requireA "homeblurb.markdown" (setFieldA "homeblurb" $ arr pageBody)
        >>> withHeaderAndFooter
        >>> applyTemplateCompiler "templates/projectlist.markdown"
        >>> applyTemplateCompiler "templates/index.markdown"
        >>> wrapContent
        >>> finish
        >>> relativizeUrlsCompiler

    -- Render project pages
    match "projects/*/index.markdown" $ do
        route   $ setExtension ".html"
        compile $ pageCompiler
            >>> withHeaderAndFooter
            >>> wrapContent
            >>> finish
            >>> relativizeUrlsCompiler

    -- Render web apps
    match "apps/*/*.js" $ do
        route idRoute 
        compile copyFileCompiler
    match "apps/*/index.md" $ do
        route   $ setExtension ".html"
        compile $ pageCompiler
           >>> withHeaderAndFooter
           >>> wrapContent
           >>> withJS
           >>> relativizeUrlsCompiler


    -- Render project main page
    match "projects/index.html" $ route idRoute
    create "projects/index.html" $ constA mempty
        >>> arr (setField "title" "All Projects")
        >>> requireAllA "projects/*/index.markdown" addProj
        >>> withHeaderAndFooter
        >>> applyTemplateCompiler "templates/projectlist.markdown"
        >>> wrapContent
        >>> finish
        >>> relativizeUrlsCompiler

    -- Render posts
    match "blawg/posts/*" $ do
        route   $ setExtension ".html"
        compile $ pageCompiler
            >>> withHeaderAndFooter
            >>> applyTemplateCompiler "templates/post.html"
            >>> wrapContent
            >>> finish
            >>> relativizeUrlsCompiler
        
    -- Render post list
    match "blawg/index.html" $ route idRoute
    create "blawg/index.html" $ constA mempty
        >>> arr (setField "title" "Blawg")
        >>> requireAllA "blawg/posts/*" addPostList
        >>> requireA "blawgblurb.markdown" (setFieldA "blawgblurb" $ arr pageBody)
        >>> withHeaderAndFooter
        >>> applyTemplateCompiler "templates/postlist.html"
        >>> wrapContent
        >>> finish
        >>> relativizeUrlsCompiler


    -- Compile footer/header
    match "footer.markdown"    $ compile pageCompiler
    match "header.markdown"    $ compile pageCompiler
    match "toybox.markdown"    $ compile pageCompiler
    match "homeblurb.markdown" $ compile pageCompiler
    match "blawgblurb.markdown" $ compile pageCompiler

    -- Read templates
    match "templates/*" $ compile templateCompiler

-- Add both a header and footer (which is usually the case)
withHeaderAndFooter :: Compiler (Page String) (Page String)
withHeaderAndFooter = requireA "footer.markdown" (setFieldA "footer" $ arr pageBody)
                  >>> requireA "header.markdown" (setFieldA "header" $ arr pageBody)

-- Wrap content in just the default template
wrapContent :: Compiler (Page String) (Page String)
wrapContent = applyTemplateCompiler "templates/content.html"

-- Apply nasty silly HTML boilerplate, with JS
finish :: Compiler (Page String) (Page String)
finish = applyTemplateCompiler "templates/default.html"

-- Apply nasty silly HTML boilerplate
withJS :: Compiler (Page String) (Page String)
withJS = applyTemplateCompiler "templates/defaultwithjs.html"

addProj :: Compiler (Page String, [Page String]) (Page String)
addProj = setFieldA "projects" $
    arr (reverse)
        >>> require "templates/projectrow.html" (\p t -> map (applyTemplate t) p)
        >>> arr mconcat
        >>> arr pageBody

-- | Auxiliary compiler: generate a post list from a list of given posts, and
-- add it to the current page under @$posts@
--
addPostList :: Compiler (Page String, [Page String]) (Page String)
addPostList = setFieldA "posts" $
    arr (reverse . chronological)
        >>> require "templates/postitem.html" (\p t -> map (applyTemplate t) p)
        >>> arr mconcat
        >>> arr pageBody

