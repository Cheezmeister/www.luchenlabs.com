--------------------------------------------------------------------------------
{-# LANGUAGE OverloadedStrings #-}
import           Control.Applicative ((<$>))
import           Data.Monoid         (mappend, mconcat)
import           Data.List (isSuffixOf)
import           Hakyll


--------------------------------------------------------------------------------
main :: IO ()
main = hakyll $ do
    -- Move Content
    match "content/**" $ do
        route   idRoute
        compile copyFileCompiler

    -- Compress CSS
    match "css/**" $ do
        route   idRoute
        compile compressCssCompiler

    -- Render normal static pages
    match (fromList ["bio.markdown", "contact.markdown"]) $ do
        route   $ setExtension "html"
        compile $ pandocCompiler
            >>= latContent
            >>= latDefault
            >>= relativizeUrls
            >>= cleanUrls

    -- Tidbits
    match "tidbits/**" $ do
        route idRoute
        compile copyFileCompiler


    -- Apps
    match "apps/nextris/index.md" $ do
        route $ setExtension "html"
        compile pandocCompiler

    -- Resume
    match "resume/src/b.m.luchen.resume.tex" $ do
        route $ setExtension "html" `composeRoutes` gsubRoute "src/" (const "")
        compile $ pandocCompiler
            >>= latContent
            >>= latDefault
            >>= relativizeUrls
            >>= cleanUrls

    match "resume/*.pdf" $ do
        route idRoute 
        compile copyFileCompiler 

    match "resume/index.markdown" $ do
        route   $ setExtension "html"
        compile $ do
            let resumeCtx = convertResume `mappend` defaultContext
            
            pandocCompiler
                >>= applyAsTemplate resumeCtx
                >>= latContent
                >>= latDefault
                >>= relativizeUrls
                >>= cleanUrls

    -- Render project pages
    match "projects/*/index.markdown" $ do
        route $ setExtension "html"
        compile $ pandocCompiler
            >>= applyAsTemplate defaultContext
            >>= latContent
            >>= latDefault
            >>= relativizeUrls

    -- Render home page
    create ["index.html"] $ do
        route idRoute
        compile $ do
            let homeCtx = field "projects" (\_ -> projectList (fromRegex "projects/(chromathud|nextris|cheezus)/index.markdown") $ recentFirst)
                    `mappend` blurb "homeblurb" "homeblurb.markdown"
                    `mappend` constField "title" "Home"              
                    `mappend` defaultContext

            makeItem ""
                >>= loadAndApplyTemplate "templates/projectlist.markdown" homeCtx
                >>= loadAndApplyTemplate "templates/index.markdown" homeCtx
                >>= loadAndApplyTemplate "templates/content.html" homeCtx
                >>= loadAndApplyTemplate "templates/default.html" (homeCtx `mappend` headerFooter)
                >>= relativizeUrls

    -- Render project main page
    create ["projects/index.html"] $ do
        route idRoute
        compile $ do
            let prjCtx = field "projects" (\_ -> projectList "projects/*/index.markdown" $ recentFirst)
                    `mappend` constField "title" "All Projects"              
                    `mappend` defaultContext

            makeItem ""
                >>= loadAndApplyTemplate "templates/projectlist.markdown" prjCtx
                >>= loadAndApplyTemplate "templates/content.html" prjCtx
                >>= loadAndApplyTemplate "templates/default.html" (prjCtx `mappend` headerFooter)
                >>= relativizeUrls

    -- Compile building blocks
    match "footer.markdown" $ compile pandocCompiler
    match "header.markdown" $ compile pandocCompiler
    match "toybox.markdown" $ compile pandocCompiler
    match "homeblurb.markdown" $ compile pandocCompiler
    match "blawgblurb.markdown" $ compile pandocCompiler
    match "resume/src/b.m.luchen.resume.tex" $ compile pandocCompiler

    match "templates/*" $ compile templateCompiler

latContent = loadAndApplyTemplate "templates/content.html" defaultContext
latDefault = loadAndApplyTemplate "templates/default.html" headerFooterCtx

cleanUrls :: Item String -> Compiler (Item String)
cleanUrls = return . fmap (withUrls clean)
    where 
        idx = "index.html"
        clean url
            | idx `isSuffixOf` url = take (length url - length idx) url
            | otherwise = url

blurb :: String -> Identifier -> Context String
blurb name id = field name $ \i -> loadBody id

convertResume :: Context String
convertResume = blurb "reshtml" "resume/src/b.m.luchen.resume.tex"

headerFooterCtx :: Context String
headerFooterCtx = headerFooter `mappend` defaultContext

headerFooter :: Context String
headerFooter = mconcat 
    [ 
    field "header" (\i -> loadBody "header.markdown" ) ,
    field "footer" (\i -> loadBody "footer.markdown" ) 
    ]

--------------------------------------------------------------------------------
projectCtx :: Context String
projectCtx =
    dateField "date" "%B %e, %Y" `mappend`
    defaultContext


--------------------------------------------------------------------------------
projectList :: Pattern -> ([Item String] -> [Item String]) -> Compiler String
projectList pattern sortFilter = do
    posts   <- sortFilter <$> loadAll pattern
    itemTpl <- loadBody "templates/projectrow.html"
    list    <- applyTemplateList itemTpl projectCtx posts
    return list


