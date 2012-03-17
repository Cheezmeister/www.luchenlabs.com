{-# LANGUAGE OverloadedStrings, Arrows #-}
module Main where

import Control.Monad (forM_)
import Control.Arrow (arr, (>>>))
import Data.Monoid (mempty, mconcat)

import Hakyll

main :: IO ()
main = hakyll $ do
    -- Move content
    match "content/*" $ do
        route   idRoute
        compile copyFileCompiler
    match "content/*/*" $ do
        route   idRoute
        compile copyFileCompiler

    -- Compress CSS
    match "css/*" $ do
        route   idRoute
        compile compressCssCompiler

    -- Render normal static pages
    forM_ ["contact.rst", "bio.markdown", "resume/index.markdown"] $ \p ->
        match p $ do
            route   $ setExtension ".html"
            compile $ pageCompiler
                >>> requireA "footer.markdown" (setFieldA "footer" $ arr pageBody)
                >>> requireA "header.markdown" (setFieldA "header" $ arr pageBody)
                >>> applyTemplateCompiler "templates/content.html"
                >>> applyTemplateCompiler "templates/default.html"
                >>> relativizeUrlsCompiler

    -- Render home page
    match "index.html" $ route $ setExtension ".html"
    create "index.html" $ constA mempty 
        >>> arr (setField "title" "Home")
        >>> requireAllA "projects/*/index.markdown" addProj
        >>> requireA "footer.markdown" (setFieldA "footer" $ arr pageBody)
        >>> requireA "header.markdown" (setFieldA "header" $ arr pageBody)
        >>> applyTemplateCompiler "templates/projectlist.markdown"
        >>> applyTemplateCompiler "templates/content.html"
        >>> applyTemplateCompiler "templates/default.html"
        >>> relativizeUrlsCompiler


    -- Render project main page
    match "projects/index.html" $ route idRoute
    create "projects/index.html" $ constA mempty
        >>> arr (setField "title" "All Projects")
        >>> requireAllA "projects/*/index.markdown" addProj
        >>> requireA "footer.markdown" (setFieldA "footer" $ arr pageBody)
        >>> requireA "header.markdown" (setFieldA "header" $ arr pageBody)
        >>> applyTemplateCompiler "templates/projects.markdown"
        >>> applyTemplateCompiler "templates/content.html"
        >>> applyTemplateCompiler "templates/default.html"
        >>> relativizeUrlsCompiler

--    match "blawg/index.html" $ route idRoute
--    create "blawg/index.html" $ constA mempty
--        >>> arr (setField "title" "Blawg"
--        >>> requireAllA "blawg/posts/*" addPostList

    -- Render project pages
    match "projects/*/index.markdown" $ do
        route   $ setExtension ".html"
        compile $ pageCompiler
            >>> requireA "footer.markdown" (setFieldA "footer" $ arr pageBody)
            >>> requireA "header.markdown" (setFieldA "header" $ arr pageBody)
            >>> applyTemplateCompiler "templates/content.html"
            >>> applyTemplateCompiler "templates/default.html"
            >>> relativizeUrlsCompiler


    -- Compile footer/header
    match "footer.markdown" $ compile pageCompiler
    match "header.markdown" $ compile pageCompiler
    match "toybox.markdown" $ compile pageCompiler

    -- Read templates
    match "templates/*" $ compile templateCompiler


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
    arr (reverse . sortByBaseName)
        >>> require "templates/postitem.html" (\p t -> map (applyTemplate t) p)
        >>> arr mconcat
        >>> arr pageBody

